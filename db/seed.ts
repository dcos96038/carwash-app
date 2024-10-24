import { db } from '.';
import { carwash } from './schema/carwash';

const seedData: Omit<typeof carwash.$inferSelect, 'id'>[] = [
  // {
  // 	name: "Car Wash Lules Centro",
  // 	address: "Av. San Martín 123, Lules, Tucumán, Argentina",
  // 	latitude: -26.922467,
  // 	longitude: -65.344527,
  // 	contactNumber: "+54 381 456-7890",
  // 	openingHours: "09:00:00",
  // 	closingHours: "19:00:00",
  // },
  // {
  // 	name: "Car Wash Los Nogales",
  // 	address: "Ruta 301 Km 20, Lules, Tucumán, Argentina",
  // 	latitude: -26.945645,
  // 	longitude: -65.370483,
  // 	contactNumber: "+54 381 987-6543",
  // 	openingHours: "10:00:00",
  // 	closingHours: "20:00:00",
  // },
  // {
  // 	name: "Car Wash Sol y Lluvia",
  // 	address: "Calle Mitre 456, Lules, Tucumán, Argentina",
  // 	latitude: -26.927355,
  // 	longitude: -65.349123,
  // 	contactNumber: "+54 381 321-9876",
  // 	openingHours: "08:00:00",
  // 	closingHours: "18:00:00",
  // },
];

async function main() {
  async function seedCarwashLocations() {
    console.log('Seeding carwash locations...');
    await db.insert(carwash).values(seedData);
    console.log('Seeding completed!');
  }

  // Call the seeding function
  await seedCarwashLocations();

  return;
}

main();
