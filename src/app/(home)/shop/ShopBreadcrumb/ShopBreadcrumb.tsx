import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export function ShopBreadcrumb() {
  return (
    <div className="px-[5%]">
      <div className="max-w-screen-xl mx-auto py-10 text-[#0E243A] flex flex-col justify-between items-center gap-5 w-full">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium">Shop</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-lg font-medium text-[#0E243A] hover:text-gray-600 hover:underline"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <p className="text-[#0E243A]">/</p>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-lg font-medium text-[#0E243A]">
                Shop
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}