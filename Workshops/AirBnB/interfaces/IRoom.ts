export interface IRoom {
    id: string;
    name: string;
    description: string;
    city: string;
    beds: number;
    price: number;
    imageUrl: string;
};

export interface ICreateRoomDTO {
    name: string;
    description: string;
    city: string;
    beds: string;
    price: string;
    imageUrl: string;
};