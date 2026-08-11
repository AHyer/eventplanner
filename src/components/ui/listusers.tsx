// src/components/ui/listusers.tsx
import {db} from '@/db/index'

export default async function ListUsers() {
  // Execute type-safe query directly inside the component
  const allUsers = await db.query.users.findMany();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Directory</h1>
      <ul className="space-y-2">
        {allUsers.map((user) => (
          <li key={user.id} className="p-3 border rounded shadow-sm">
            <p className="font-semibold">{user.username}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-500">{user.role}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
