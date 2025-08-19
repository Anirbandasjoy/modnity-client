import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export function CartBreadcrumb() {
  return (
    <div className="px-[5%] ">
      <div className="max-w-screen-xl mx-auto py-10 text-[#0E243A] flex flex-col justify-between items-center gap-5 w-full rounded">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-caladea">Cart</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-lg font-medium text-[#0E243A] hover:text-white hover:underline"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <p className="text-[#0E243A]">/</p>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-lg font-medium text-[#0E243A]">
                Cart
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
