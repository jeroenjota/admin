<template>
  <div class="flex min-h-screen">
    <aside class="w-64 bg-gray-900 text-white p-4">
      <h1 class="text-xl font-bold mb-6">Admin</h1>
      <nav class="space-y-2">
        <RouterLink to="/tours" class="block hover:underline">Tours</RouterLink>
      </nav>
    </aside>

    <main class="flex-1 p-6 bg-gray-100">
      <RouterView />
    </main>
  </div>
</template>
