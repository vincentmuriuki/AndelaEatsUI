import faker from 'faker';

const engagements = [];

do {
  engagements.push({
    id: faker.random.uuid(),
    endDate: faker.date.recent().toString(),
    startDate: faker.date.recent().toString(),
    vendor: {
      name: faker.company.companyName()
    }
  })
} while (engagements.length <= 5);

export default engagements;
