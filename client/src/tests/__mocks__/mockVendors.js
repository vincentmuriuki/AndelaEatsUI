import faker from 'faker';

const vendors = [];

do {
  vendors.push({
    id: faker.random.uuid(),
    contactPerson: `${faker.name.firstName()} ${faker.name.lastName()}`,
    vendorName: faker.company.companyName(),
    vendorAddress: faker.address.streetAddress(),
    createdAt: faker.date.recent().toString(),
    updatedAt: faker.date.recent().toString(),
    phoneNumber: faker.phone.phoneNumber(),
  });
} while (vendors.length <= 5);

export default vendors;
