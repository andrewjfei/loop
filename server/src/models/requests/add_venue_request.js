class AddVenueRequest {
    name;
    description;
    type;

    constructor(name, description, type) {
        this.name = name;
        this.description = description;
        this.type = type;
    }

    toString() {
        return `[AddVenueRequest] { name: ${this.name}, description: ${this.description}, type: ${this.type} }`;
    }
}

export { AddVenueRequest };
