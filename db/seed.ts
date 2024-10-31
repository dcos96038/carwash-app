import { UserService } from '@/services/user.service';
import { db } from '.';
import { CarwashService } from '@/services/carwash.service';
import { Carwash } from '@/types/carwash.types';
import { User } from '@/types/user.types';
import { carwash } from './schema/carwash';

async function main() {
  const authService = new UserService();
  const locationService = new CarwashService();

  const emails = ['user@gmail.com', 'user2@gmail.com'];

  const users: User[] = [];

  const password = 'P@ssw0rd';

  if ((await authService.getUserLength()) === 0) {
    await createUsers(emails, authService, password, users);
  }

  if ((await locationService.getCarwashLength()) === 0) {
    const seedData: Omit<Carwash, 'id'>[] = [
      {
        name: 'Car Wash Lules Centro',
        owner_id: users[0].id,
        address: 'Av. San Martín 123, Lules, Tucumán, Argentina',
        latitude: -26.922467,
        longitude: -65.344527,
        contactNumber: '+54 381 456-7890',
        openingHours: '09:00:00',
        closingHours: '19:00:00',
        status: 'open',
        email: '',
        logo: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Car Wash Yerba Buena',
        owner_id: users[0].id,
        address: 'Av. Aconquija 456, Yerba Buena, Tucumán, Argentina',
        latitude: -26.816667,
        longitude: -65.316667,
        contactNumber: '+54 381 456-7890',
        openingHours: '09:00:00',
        closingHours: '19:00:00',
        status: 'open',
        email: '',
        logo: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Car Wash San Miguel de Tucumán',
        owner_id: users[1].id,
        address: 'Av. Sarmiento 789, San Miguel de Tucumán, Tucumán, Argentina',
        latitude: -26.808284,
        longitude: -65.21759,
        contactNumber: '+54 381 456-7890',
        openingHours: '09:00:00',
        closingHours: '19:00:00',
        status: 'open',
        email: '',
        logo: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Car Wash El Grafi',
        owner_id: users[1].id,
        address: 'C. 77 500, T4101, Tucumán',
        latitude: -26.75639799038959,
        longitude: -65.19716051215872,
        contactNumber: '+54 381 456-7890',
        openingHours: '09:00:00',
        closingHours: '19:00:00',
        status: 'open',
        email: '',
        logo: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    console.log('Seeding carwash locations...');
    await db.insert(carwash).values(seedData);
    console.log('Seeding completed!');
  }

  return;
}

async function createUsers(
  emails: string[],
  authService: UserService,
  password: string,
  users: {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    password: string | null;
    role: 'USER' | 'ADMIN';
  }[]
) {
  for (const email of emails) {
    const user = await authService.getUserFromDb(email);

    if (!user) {
      const user = await authService.addUserToDb(email, password);
      if (!user) {
        throw new Error('Failed to create user');
      }
      users.push(user);
    }
  }
}

main();
