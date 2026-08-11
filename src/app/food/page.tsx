export default function FoodPage() {  // function = component ;  returns UI elements
  return (
    // <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    <div>
      <main className="food-background flex flex-1 w-full flex-col items-center justify-between py-66 px-16 bg-white dark:bg-black "> </main>
    </div>
  );
}

//goal: scrape user-chosen recipes & images from web and/or recipe saving sites
//incorporate AI to suggest recipes/menus based on user-supplied data about the events and it's guests