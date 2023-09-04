class AddVenueRequest {
    name;
    description;
    capacity;
    type;

    constructor(name, description, capacity, type) {
        this.name = name;
        this.description = description;
        this.capacity = capacity;
        this.type = type;
    }

    toString() {
        return `[AddVenueRequest] { name: ${this.name}, description: ${this.description}, capacity: ${this.capacity}, type: ${this.type} }`;
    }
}

export { AddVenueRequest };
