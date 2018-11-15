import faker from 'faker';

const engagements = [];

do {
  engagements.push({
    endDate: faker.date.recent().toString(),
    startDate: faker.date.recent().toString(),
    vendor: {
      name: faker.company.companyName()
    }
  })
} while (engagements.length <= 5);


export const newEngagement = {
  vendorId: 44,
  startDate: "2018-12-01",
  endDate: "2018-12-20"
};

export default engagements;
