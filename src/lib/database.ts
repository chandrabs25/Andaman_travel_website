import { D1Database } from '@cloudflare/workers-types';

// Initialize globalDb with null
let globalDb: D1Database | null = null;

// Sample data for mock database
const mockData = {
  users: [
    { id: 1, email: 'user@example.com', password_hash: 'hashed_password', first_name: 'John', last_name: 'Doe', phone: '9876543210', role_id: 1 },
    { id: 2, email: 'vendor@example.com', password_hash: 'hashed_password', first_name: 'Jane', last_name: 'Smith', phone: '8765432109', role_id: 2 }
  ],
  islands: [
    { id: 1, name: 'Havelock Island', description: 'Home to Radhanagar Beach, one of Asia\'s best beaches', image_url: '/images/havelock.jpg', location: 'Andaman Islands' },
    { id: 2, name: 'Neil Island', description: 'Known for its pristine beaches and natural bridge', image_url: '/images/neil.jpg', location: 'Andaman Islands' },
    { id: 3, name: 'Port Blair', description: 'The capital city with historical Cellular Jail', image_url: '/images/port-blair.jpg', location: 'Andaman Islands' },
    { id: 4, name: 'Baratang Island', description: 'Famous for limestone caves and mud volcanoes', image_url: '/images/baratang.jpg', location: 'Andaman Islands' }
  ],
  services: [
    { id: 1, name: 'Scuba Diving', description: 'Explore vibrant coral reefs and marine life', image_url: '/images/scuba.jpg', price: 4500, duration: '3 hours', island_id: 1, provider_id: 1 },
    { id: 2, name: 'Glass Bottom Boat Tour', description: 'View the underwater world without getting wet', image_url: '/images/boat.jpg', price: 1800, duration: '2 hours', island_id: 1, provider_id: 1 },
    { id: 3, name: 'Sea Walking', description: 'Walk on the ocean floor with specialized equipment', image_url: '/images/sea-walking.jpg', price: 3500, duration: '2 hours', island_id: 2, provider_id: 2 },
    { id: 4, name: 'Kayaking', description: 'Paddle through mangroves and bioluminescent waters', image_url: '/images/kayaking.jpg', price: 2000, duration: '3 hours', island_id: 3, provider_id: 2 }
  ],
  packages: [
    { id: 1, name: 'Andaman Island Explorer', description: '7-day comprehensive tour of the major Andaman Islands', image_url: '/images/package1.jpg', price: 35000, duration: '7 days / 6 nights', is_active: 1 },
    { id: 2, name: 'Havelock Beach Retreat', description: 'Relaxing 4-day beach vacation on Havelock Island', image_url: '/images/package2.jpg', price: 22000, duration: '4 days / 3 nights', is_active: 1 },
    { id: 3, name: 'Adventure Package', description: 'Action-packed 5-day adventure with scuba, trekking and more', image_url: '/images/package3.jpg', price: 28000, duration: '5 days / 4 nights', is_active: 1 }
  ],
  bookings: [
    { id: 1, user_id: 1, package_id: 1, total_people: '2', start_date: '2025-05-10', end_date: '2025-05-17', total_amount: 70000 },
    { id: 2, user_id: 1, package_id: 2, total_people: '4', start_date: '2025-06-15', end_date: '2025-06-19', total_amount: 88000 }
  ],
  reviews: [
    { id: 1, user_id: 1, service_id: 1, rating: 5, comment: 'Amazing experience! The coral reefs were beautiful.', first_name: 'John', last_name: 'Doe' },
    { id: 2, user_id: 1, service_id: 2, rating: 4, comment: 'Great way to see marine life without getting wet.', first_name: 'John', last_name: 'Doe' }
  ],
  ferry_schedules: [
    { id: 1, ferry_id: 1, origin_id: 3, destination_id: 1, departure_time: '2025-04-15 08:00:00', arrival_time: '2025-04-15 10:30:00', price: 1200, ferry_name: 'Makruzz', capacity: 200 },
    { id: 2, ferry_id: 1, origin_id: 1, destination_id: 3, departure_time: '2025-04-15 14:00:00', arrival_time: '2025-04-15 16:30:00', price: 1200, ferry_name: 'Makruzz', capacity: 200 },
    { id: 3, ferry_id: 2, origin_id: 3, destination_id: 2, departure_time: '2025-04-15 09:30:00', arrival_time: '2025-04-15 11:30:00', price: 1000, ferry_name: 'Green Ocean', capacity: 150 }
  ],
  service_providers: [
    { id: 1, user_id: 2, business_name: 'Andaman Adventures', description: 'Premier adventure sports provider in Andaman', address: 'Beach No. 5, Havelock Island', verified: 1 }
  ]
};

// Initialize the database with the provided D1 instance
export function initializeDb(d1Database: D1Database) {
  // Only initialize if it hasn't been initialized already
  if (globalDb === null) {
    globalDb = d1Database;
  }
  return globalDb;
}

// Create a mock database for development and testing if globalDb is still null
if (globalDb === null) {
  console.log("Initializing Mock Database...");
  // This is a mock implementation for development
  globalDb = {
    prepare: (query: string) => {
      console.log("Mock DB Prepare:", query);
      // Parse the query to determine which table to access
      const lowerQuery = query.toLowerCase();
      let tableName = '';
      const fromMatch = lowerQuery.match(/from\s+([\w]+)/);
      const insertMatch = lowerQuery.match(/insert into\s+([\w]+)/);
      const updateMatch = lowerQuery.match(/update\s+([\w]+)/);
      const deleteMatch = lowerQuery.match(/delete from\s+([\w]+)/);

      if (fromMatch) tableName = fromMatch[1];
      else if (insertMatch) tableName = insertMatch[1];
      else if (updateMatch) tableName = updateMatch[1];
      else if (deleteMatch) tableName = deleteMatch[1];
      else tableName = 'unknown'; // Default if table cannot be parsed

      console.log("Mock DB Table:", tableName);

      return {
        bind: (...args: any[]) => {
           console.log("Mock DB Bind Args:", args);
          return {
            first: async <T = unknown>(): Promise<T | null> => {
              console.log("Mock DB First - Table:", tableName, "Args:", args);
              // Handle specific queries based on the table
              if (tableName === 'users') {
                if (lowerQuery.includes('where email = ?') && args[0]) {
                  return (mockData.users.find(user => user.email === args[0]) || null) as T | null;
                } else if (lowerQuery.includes('where id = ?') && args[0]) {
                  return (mockData.users.find(user => user.id === args[0]) || null) as T | null;
                }
              } else if (tableName === 'islands' && lowerQuery.includes('where id = ?') && args[0]) {
                return (mockData.islands.find(island => island.id === args[0]) || null) as T | null;
              } else if (tableName === 'services' && lowerQuery.includes('where id = ?') && args[0]) {
                return (mockData.services.find(service => service.id === args[0]) || null) as T | null;
              } else if (tableName === 'packages' && lowerQuery.includes('where id = ?') && args[0]) {
                return (mockData.packages.find(pkg => pkg.id === args[0]) || null) as T | null;
              } else if (tableName === 'service_providers' && lowerQuery.includes('where user_id = ?') && args[0]) {
                return (mockData.service_providers.find(provider => provider.user_id === args[0]) || null) as T | null;
              }
              console.log("Mock DB First - No Match - Returning null");
              return null; // Return null if no match or specific logic
            },
            all: async <T = unknown>(): Promise<{ results: T[] }> => {
              console.log("Mock DB All - Table:", tableName, "Args:", args);
              // Return appropriate mock data based on the query
              if (tableName === 'islands') {
                return { results: mockData.islands as T[] };
              } else if (tableName === 'services') {
                if (lowerQuery.includes('where island_id = ?') && args[0]) {
                  return { results: mockData.services.filter(service => service.island_id === args[0]) as T[] };
                } else if (lowerQuery.includes('where provider_id = ?') && args[0]) {
                  return { results: mockData.services.filter(service => service.provider_id === args[0]) as T[] };
                }
                return { results: mockData.services as T[] };
              } else if (tableName === 'packages') {
                 // Simple filtering mock for packages example
                 let results = mockData.packages;
                 if (lowerQuery.includes('where is_active = ?') && args.includes(1)) { // Assuming 'is_active = 1'
                    results = results.filter(p => p.is_active === 1);
                 }
                 // Add more mock filtering based on args if needed (LIKE, >=, <=)
                 return { results: results as T[] };
              } else if (tableName === 'bookings' && lowerQuery.includes('where user_id = ?') && args[0]) {
                return { results: mockData.bookings.filter(booking => booking.user_id === args[0]) as T[] };
              } else if (tableName === 'reviews' && lowerQuery.includes('where service_id = ?') && args[0]) {
                // Mock JOIN for reviews
                const serviceReviews = mockData.reviews.filter(review => review.service_id === args[0]);
                const resultsWithUser = serviceReviews.map(review => {
                    const user = mockData.users.find(u => u.id === review.user_id);
                    return { ...review, user_name: user ? `${user.first_name} ${user.last_name}` : 'Unknown User' };
                });
                return { results: resultsWithUser as T[] };
              } else if (tableName === 'ferry_schedules') {
                // Basic mock filtering for ferry schedules
                let results = mockData.ferry_schedules;
                if (args.length >= 3 && lowerQuery.includes('where fs.origin_id = ?') && lowerQuery.includes('fs.destination_id = ?') && lowerQuery.includes('date(fs.departure_time) = ?')) {
                    results = results.filter(
                        schedule =>
                            schedule.origin_id === args[0] &&
                            schedule.destination_id === args[1] &&
                            schedule.departure_time.startsWith(args[2]) // Simple date check
                    );
                }
                // Mock JOIN for ferry name
                const resultsWithFerryName = results.map(schedule => ({ ...schedule, ferry_name: schedule.ferry_name || 'Unknown Ferry'}));
                return { results: resultsWithFerryName as T[] };
              } else if (tableName === 'destinations') { // Added mock for destinations search
                  let results = mockData.islands; // Using islands as destinations mock
                  if (lowerQuery.includes('where name like ?')) {
                      const searchTerm = args[0].replace(/%/g, '').toLowerCase(); // Simple search mock
                      results = results.filter(d => d.name.toLowerCase().includes(searchTerm) || (d.description && d.description.toLowerCase().includes(searchTerm)) || (d.location && d.location.toLowerCase().includes(searchTerm)));
                  }
                  return { results: results as T[] };
              } else if (tableName === 'service_providers' && lowerQuery.includes('where verified = ?')) { // Added mock for vendors/providers list
                  let results = mockData.service_providers;
                  if(args.includes(1)){
                      results = results.filter(p => p.verified === 1);
                  }
                  // Add other filtering mocks if needed (type, rating)
                  return { results: results as T[] };
              }

              console.log("Mock DB All - No Match - Returning empty array");
              return { results: [] }; // Return empty array if no match or logic
            },
            run: async (): Promise<{ success: boolean; meta?: { last_row_id?: number | null; changes?: number } }> => {
              console.log("Mock DB Run - Table:", tableName, "Args:", args);
              // Simulate INSERT/UPDATE/DELETE - just return success
              // You could add mock data modification here if needed for testing flows
              if (insertMatch || updateMatch || deleteMatch) {
                  console.log("Mock DB Run - Success (Simulated)");
                  return { success: true, meta: { changes: 1, last_row_id: Math.floor(Math.random() * 1000) + 1 } }; // Simulate changes and ID
              }
              console.log("Mock DB Run - Failed (Not Insert/Update/Delete)");
              return { success: false, meta: { changes: 0 } };
            },
          };
        },
      };
    },
    // Mock execute (less common with D1 prepare)
    exec: async (query: string): Promise<{ count: number; duration: number }> => {
       console.log("Mock DB Exec:", query);
       // Simulate simple exec result
      return { count: 0, duration: 1 };
    },
    // Mock batch (important for multiple inserts/updates)
    batch: async (statements: ReadonlyArray<any>): Promise<any[]> => {
       console.log("Mock DB Batch - Statements:", statements.length);
       const results = [];
       for (const stmt of statements) {
          // Simulate running each statement in the batch
          // In a real mock, you might inspect stmt.query or stmt.params
          results.push(await stmt.run()); // Use the mock run logic
       }
       return results;
    },
    // Mock dump (likely not needed)
    dump: async (): Promise<ArrayBuffer> => {
       console.log("Mock DB Dump - Returning empty buffer");
       return new ArrayBuffer(0);
    }

  } as unknown as D1Database; // Cast to D1Database type
}

// Export the db instance for direct use in API routes
// Use type assertion to assure TS it will be D1Database
export const db = globalDb as D1Database;

// Database service for handling database operations
export class DatabaseService {
  private db: D1Database;

  constructor(dbInstance: D1Database) {
    // Use the instance passed to the constructor
    this.db = dbInstance;
  }

  // User methods
  async getUserByEmail(email: string) {
    return this.db
      .prepare('SELECT * FROM users WHERE email = ?')
      .bind(email)
      .first();
  }

  async getUserById(id: number) {
    return this.db
      .prepare('SELECT * FROM users WHERE id = ?')
      .bind(id)
      .first();
  }

  async createUser(userData: {
    email: string;
    password_hash: string;
    first_name: string;
    last_name: string;
    phone?: string;
    role_id: number;
  }) {
    return this.db
      .prepare(
        'INSERT INTO users (email, password_hash, first_name, last_name, phone, role_id) VALUES (?, ?, ?, ?, ?, ?)'
      )
      .bind(
        userData.email,
        userData.password_hash,
        userData.first_name,
        userData.last_name,
        userData.phone || null,
        userData.role_id
      )
      .run();
  }

  // Island methods
  async getAllIslands() {
    return this.db.prepare('SELECT * FROM islands').all();
  }

  async getIslandById(id: number) {
    return this.db
      .prepare('SELECT * FROM islands WHERE id = ?')
      .bind(id)
      .first();
  }

  // Service methods
  async getServicesByIsland(islandId: number) {
    return this.db
      .prepare('SELECT * FROM services WHERE island_id = ?')
      .bind(islandId)
      .all();
  }

  async getServiceById(id: number) {
    return this.db
      .prepare('SELECT * FROM services WHERE id = ?')
      .bind(id)
      .first();
  }

  // Package methods
  async getAllPackages() {
    return this.db.prepare('SELECT * FROM packages WHERE is_active = 1').all();
  }

  async getPackageById(id: number) {
    return this.db
      .prepare('SELECT * FROM packages WHERE id = ?')
      .bind(id)
      .first();
  }

  // Booking methods
  async createBooking(bookingData: {
    user_id: number;
    package_id?: number;
    total_people: string;
    start_date: string;
    end_date: string;
    total_amount: number;
  }) {
    return this.db
      .prepare(
        'INSERT INTO bookings (user_id, package_id, total_people, start_date, end_date, total_amount, created_at) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)'
      )
      .bind(
        bookingData.user_id,
        bookingData.package_id || null,
        bookingData.total_people,
        bookingData.start_date,
        bookingData.end_date,
        bookingData.total_amount
      )
      .run();
  }

  async getBookingsByUser(userId: number) {
    return this.db
      .prepare('SELECT * FROM bookings WHERE user_id = ?')
      .bind(userId)
      .all();
  }

  // Review methods
  async createReview(reviewData: {
    user_id: number;
    service_id: number;
    rating: number;
    comment: string;
  }) {
    return this.db
      .prepare(
        'INSERT INTO reviews (user_id, service_id, rating, comment, created_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)'
      )
      .bind(
        reviewData.user_id,
        reviewData.service_id,
        reviewData.rating,
        reviewData.comment
      )
      .run();
  }

  async getReviewsByService(serviceId: number) {
    return this.db
      .prepare(`
        SELECT r.*, u.first_name, u.last_name
        FROM reviews r
        JOIN users u ON r.user_id = u.id
        WHERE r.service_id = ?
        ORDER BY r.created_at DESC
      `)
      .bind(serviceId)
      .all();
  }

  // Ferry methods
  async getFerrySchedules(originId: number, destinationId: number, date: string) {
    return this.db
      .prepare(`
        SELECT fs.*, f.name as ferry_name
        FROM ferry_schedules fs
        JOIN ferries f ON fs.ferry_id = f.id
        WHERE fs.origin_id = ? AND fs.destination_id = ? AND DATE(fs.departure_time) = ?
        ORDER BY fs.departure_time
      `)
      .bind(originId, destinationId, date)
      .all();
  }

  // Service Provider methods
  async getServiceProviderByUserId(userId: number) {
    return this.db
      .prepare('SELECT * FROM service_providers WHERE user_id = ?')
      .bind(userId)
      .first();
  }

  async createServiceProvider(providerData: {
    user_id: number;
    business_name: string;
    description: string;
    address: string;
  }) {
    return this.db
      .prepare(
        'INSERT INTO service_providers (user_id, business_name, description, address, verified, created_at) VALUES (?, ?, ?, ?, 0, CURRENT_TIMESTAMP)'
      )
      .bind(
        providerData.user_id,
        providerData.business_name,
        providerData.description,
        providerData.address
      )
      .run();
  }

  async getServicesByProvider(providerId: number) {
    return this.db
      .prepare('SELECT * FROM services WHERE provider_id = ?')
      .bind(providerId)
      .all();
  }

  // Search methods
  async searchDestinations(query: string) {
    const searchTerm = `%${query}%`;
    return this.db
      .prepare(`
        SELECT * FROM destinations 
        WHERE name LIKE ? OR description LIKE ? OR location LIKE ?
        LIMIT 10
      `)
      .bind(searchTerm, searchTerm, searchTerm)
      .all();
  }

  // Admin methods
  async getAllServiceProviders(verified: boolean = true) {
    return this.db
      .prepare('SELECT * FROM service_providers WHERE verified = ?')
      .bind(verified ? 1 : 0)
      .all();
  }

  async verifyServiceProvider(providerId: number) {
    return this.db
      .prepare('UPDATE service_providers SET verified = 1 WHERE id = ?')
      .bind(providerId)
      .run();
  }
}
