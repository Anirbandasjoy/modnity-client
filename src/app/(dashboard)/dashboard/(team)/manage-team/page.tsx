"use client"; // ⚛️ React Core


// 🧱 UI Components - Table
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// 🧱 UI Components - Dropdown
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// 🧱 UI Components - Miscellaneous
import { Skeleton } from "@/components/ui/skeleton";

// 🔢 Pagination Component

// 🔍 Filters Component
// import Filters from "@/components/layout/dashboard/shared/Filters";

// 🗑️ Delete Confirmation Dialog
import GlobalDelete from "@/components/layout/dashboard/shared/DeleteGlobal/GlobalDelete";

// 📦 Redux API Hooks (data-related)


// 🔔 Notifications
import toast from "react-hot-toast";

// 📸 Images and Links
import Image from "next/image";
import Link from "next/link";

// 🎨 Icons - Lucide
import {
  CalendarDays,
  FileText,
  MoreHorizontal,
  UserCog,
} from "lucide-react";
import { useLoggedInUserQuery } from "@/redux/features/users/userApi";
import { Button } from "@/components/ui/button";
import Heading from "@/components/layout/dashboard/shared/Heading";
import { useHandleDeleteTeamMutation, useHandleFindTeamQuery } from "@/redux/features/team/teamApi";
// import { Input } from "@/components/ui/input";

// 📝 data Interface - Defines structure for each data object
interface IData {
  _id: string; // Unique data ID from MongoDB
  name: string;
  image: string;
  designation: string;
  slug: string;
  createdAt: string; // ISO date string when the data was created
  updatedAt: string; // ISO date string when the data was last updated
}

const ManagePage = () => {
  // //  State management for the search and pagination features
  // const [searchText, setSearchText] = useState<string>(""); // Stores the search query
  // const [limit, setLimit] = useState<number>(10); // Sets the limit (items per page)
  // const searchRef = useRef<HTMLInputElement>(null); // Reference to the search input
  // const [isSearching, setIsSearching] = useState<boolean>(false); // Tracks if a search is ongoing
  // const [isLoadingLimit, setIsLoadingLimit] = useState<boolean>(false); // Loading state for limit change

  // Query to fetch all data based on pagination and search text
  const { data, refetch, isLoading } = useHandleFindTeamQuery({});
  // Extracting the data list and total pages from the response
  const allData: IData[] = data?.payload || [];

  const { data: user, isLoading: userLoading } = useLoggedInUserQuery();
  const userModerator = user?.payload;

  // Mutation to handle data deletion
  const [handleDeleteTeam, { isLoading: isDeleting }] =
    useHandleDeleteTeamMutation();

  // Function to delete a selected data
  const handleDelete = async (id: string) => {
    try {
      await handleDeleteTeam(id).unwrap(); // Call the delete mutation
      refetch(); // Re-fetch the list of data after deletion
      toast.success("Successfully deleted data!"); // Show success toast
    } catch (error: any) {
      const message = error?.data?.payload?.message || "Something went wrong"; // Handle error
      toast.error(message); // Show error toast
    }
  };

  // // Function to handle search
  // const handleSearch = async () => {
  //   setIsSearching(true);
  //   const trimmedValue = searchRef.current?.value.trim() || ""; // Trim whitespace from the search query
  //   setSearchText(trimmedValue);
  //   toast.success(`Searching for "${trimmedValue || "all"}"`); // Show search message
  //   await refetch(); // Refetch the data based on the new search query
  //   setIsSearching(false);
  // };

  // // Function to handle changes in items per page (pagination limit)
  // const handleLimitChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setIsLoadingLimit(true); // Set loading state for limit change
  //   setLimit(Number(e.target.value)); // Update the limit based on user selection
  //   await refetch(); // Refetch the data with the new limit
  //   setIsLoadingLimit(false);
  // };

  // // Use effect to trigger refetch when search text changes
  // useEffect(() => {
  //   if (searchText === "") {
  //     refetch(); // Refetch all data if the search text is empty
  //   }
  // }, [searchText, refetch]);

  return (
    <div>
      <div>
        {/* Heading */}
        <div className="mb-5 flex justify-between flex-wrap gap-4 lg:gap-0">
          <Heading
            title="Manage Teams"
            subTitle="Manage all your teams. You can delete or edit teams."
          />
        </div>
      </div>

      <div className="flex justify-between items-center gap-5 mb-5">
        <br />
        <Button variant="outline" className="">
          {allData?.length} team Loaded
        </Button>
      </div>

      {/* Table */}
      <Table className="max-h-[calc(100vh-15rem)] border border-gray-200">
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Create Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading || userLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-20 w-32 rounded-md" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-80" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-8 ml-auto" />
                </TableCell>
              </TableRow>
            ))
          ) : allData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                No data found.
              </TableCell>
            </TableRow>
          ) : (
            allData.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <Image
                    width={150}
                    height={100}
                    src={item.image}
                    alt={item.name}
                    className="rounded-md object-cover h-20 w-32"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>{item.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>{item.designation}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <CalendarDays size={18} className="text-blue-600" />
                    <span>
                      {new Date(item?.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded-full cursor-pointer">
                        <MoreHorizontal />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <Link href={`/dashboard/update-team/${item._id}`}>
                        <button className="flex items-center gap-2 text-blue-600 p-2 hover:bg-blue-50 w-full cursor-pointer">
                          <UserCog className="w-4 h-4" />
                          Edit
                        </button>
                      </Link>
                      {userModerator?.role == "admin" && (
                        <GlobalDelete
                          onConfirm={() => handleDelete(item._id)}
                          loading={isDeleting}
                        />
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManagePage;
