import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CouponService from "../../Services/CouponService";
import Coupon from "../../Entities/Coupon";
import NavButton from "../../Components/NavButton/NavButton";
import LoginService from "../../Services/LoginService";

function CouponSearch() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [filteredCoupons, setFilteredCoupons] = useState<Coupon[]>([]);

  const [searchTerm, setSearchTerm] = useState("")
  const [onlyMine, setOnlyMine] = useState(false)

  useEffect(() => {
    const fetchCoupons = async () => {
      const coupons = await CouponService.searchAll();
      setCoupons(coupons);
      setFilteredCoupons(coupons)
    };

    fetchCoupons();
  }, []);

  const handleOnlyMineChange = (event: any) => {
    setOnlyMine(!onlyMine);
  };

  useEffect(()=>{
      setFilteredCoupons(coupons.filter( c => {
          const mineId = LoginService.getLogged()?.id
              if(!mineId) return

          if(onlyMine)
              return c.store.match(searchTerm) && c.owner?.id == mineId
          else 
              return c.store.match(searchTerm)
      }))
  },[searchTerm, onlyMine])

  return (
    <Container>
      <TopContainer>
        <Title>Coupon Search</Title><NavButton 
          link={'/coupons/create'}
        >Create Coupon</NavButton>
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
                    Only my Coupons                    
                </label>
            </SearchContainer>
      {filteredCoupons.map((coupon) => (
        <StyledCouponItem key={coupon.id}>
            <FieldContainer>
              <Name>
                Store
              </Name>
              <Value>
                {coupon.store}
              </Value>
            </FieldContainer>
            <FieldContainer>
              <Name>
                Code
              </Name>
              <Value>
                {onlyMine? coupon.code : "-"}
              </Value>
            </FieldContainer>
            <FieldContainer>
              <Name>
                Creator
              </Name>
              <Value>
                {coupon.creator.name}
              </Value>
            </FieldContainer>
            {coupon.owner && <FieldContainer>
              <Name>
                Owner
              </Name>
              <Value>
                {coupon.owner.name}
              </Value>
            </FieldContainer>}
        </StyledCouponItem>
      ))}
    </Container>
  );
};

export default CouponSearch;


const StyledCouponItem = styled.div`
  margin: 2em;
  background-color: #408E91;
  padding: 2em;
  box-shadow: 10px 10px 0px #ccc;
  border-radius: 5px;
`;

const Container = styled.div`
  margin: 0 20vw 0 20vw;
  max-width: 60vw;
`;

const Title = styled.h2`
`;

const TopContainer = styled.div`
  display:flex;
  padding: 1em 0 1em 0;
  border-bottom: 1px solid #555;
  justify-content: space-around;
`;

const FieldContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.5em;
`

const Name = styled.div`
    text-align: left;
    font-weight: bold;
`

const Value = styled.div`
    text-align: right;
    font-style: italic;
`

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