import moment from 'moment'
import Room from '../../../Entities/Room'

const rooms = [
    new Room(1,'room1', 'Matheus', 50, moment()),
    new Room(2,'room2', 'Leonardo', 30, moment()),
    new Room(3,'room3', 'Iago', 28, moment()),
]

export default rooms