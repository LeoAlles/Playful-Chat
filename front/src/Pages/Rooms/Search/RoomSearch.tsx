import React, {useEffect, useState} from "react"
// import rooms from './room'
import RoomItem from "./RoomItem"
import { PageContainer } from "./style"
import Room from "../../../Entities/Room"
import RoomService from "../../../Services/RoomService"
import styled
 from "styled-components"
import NavButton from "../../../Components/NavButton/NavButton"
import LoginService from "../../../Services/LoginService"

export default function RoomSearch(){
    const [rooms, setRooms] = useState<Room[]>([])
    const [filteredRooms, setFilteredRooms] = useState<Room[]>([])

    const [searchTerm, setSearchTerm] = useState("")
    const [onlyMine, setOnlyMine] = useState(false)

    useEffect(()=>{
        RoomService.searchAll()
            .then( data => {
                setRooms(data)
                setFilteredRooms(data)
            })
    }, [])

    const handleOnlyMineChange = (event: any) => {
        setOnlyMine(!onlyMine);
    };

    useEffect(()=>{
        setFilteredRooms(rooms.filter( r => {
            const mineId = LoginService.getLogged()?.id
                if(!mineId) return

            if(onlyMine)
                return r.name.match(searchTerm) && r.creator.id == mineId
            else 
                return r.name.match(searchTerm)
        }))
    },[searchTerm, onlyMine])

    return (
        <PageContainer>
            <TopContainer>
                <Title>Rooms List</Title>
                <NavButton link={'/rooms/create'}>Create Room</NavButton>
            </TopContainer>
            <SearchContainer>
                <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search"
                />
                <label>
                    <Input
                        type="radio"
                        checked={onlyMine}
                        onClick={handleOnlyMineChange}
                    />
                    Only my Rooms                    
                </label>
            </SearchContainer>
            {(filteredRooms ?? []).map( (room) => {
                return <RoomItem room={room} onlyMine={onlyMine}/>
            })}
        </PageContainer>
    )
}

const Title = styled.h2`
`;

const TopContainer = styled.div`
  display:flex;
  padding: 1.5em;
  border-bottom: 1px solid #555;
  justify-content: space-around;
`;

const SearchContainer = styled.div`
  display:flex;
  padding: 1.5em;
  border-bottom: 1px solid #555;
  justify-content: space-around;
  align-items: center;
`;

const Input = styled.input`
  padding: 1em;
  font-size: 1.2em;
  border-radius: 0.5em;
`;