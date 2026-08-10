
import ListUsers from "../../components/ui/listusers";
import CreateUserForm from "../../components/ui/createuserform";


//eventplanner/src/components/ui/listusers.tsx

export default function LoginPage() {  // function = component ;  returns UI elements
  return (
    // {/* <main className="login-background flex flex-1 w-full flex-col items-center justify-between py-66 px-16 bg-white dark:bg-black "> */}
    <div>
        <main className=" flex flex-1 w-full flex-col items-center justify-between py-66 px-16 bg-white dark:bg-black ">
        <ListUsers/>
        <CreateUserForm/>
         </main>
    </div>
  );
}