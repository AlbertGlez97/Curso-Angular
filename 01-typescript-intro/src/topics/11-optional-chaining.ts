export interface Passenger {
  name: string;
  children?: string[];
}

const passenger1: Passenger = {
  name: "John Doe",
};

const passenger2: Passenger = {
  name: "Jane Doe",
  children: ["Alice", "Bob"],
};

const printChildren = (passenger: Passenger) => {

    const howManyChildren = passenger.children?.length ?? 0;

    console.log(
      `${passenger.name} has ${howManyChildren} children.`
    );
}

printChildren(passenger1); // John Doe has 0 children.
printChildren(passenger2); // Jane Doe has 2 children.
