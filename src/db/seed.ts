import { db } from ".";
import { carwashLocations } from "./schema";

const seedData = [
	{
		name: "Car Wash Lules Centro",
		address: "Av. San Martín 123, Lules, Tucumán, Argentina",
		latitude: -26.922467,
		longitude: -65.344527,
		contactNumber: "+54 381 456-7890",
		openingHours: "8 AM - 6 PM",
	},
	{
		name: "Car Wash Los Nogales",
		address: "Ruta 301 Km 20, Lules, Tucumán, Argentina",
		latitude: -26.945645,
		longitude: -65.370483,
		contactNumber: "+54 381 987-6543",
		openingHours: "9 AM - 5 PM",
	},
	{
		name: "Car Wash Sol y Lluvia",
		address: "Calle Mitre 456, Lules, Tucumán, Argentina",
		latitude: -26.927355,
		longitude: -65.349123,
		contactNumber: "+54 381 321-9876",
		openingHours: "8 AM - 8 PM",
	},
];

async function main() {
	async function seedCarwashLocations() {
		console.log("Resetting carwash locations table...");
		await db.delete(carwashLocations);
		console.log("Table reset completed!");

		console.log("Seeding carwash locations...");
		await db.insert(carwashLocations).values(seedData);
		console.log("Seeding completed!");
	}

	// Call the seeding function
	await seedCarwashLocations();

	return;
}

main();
