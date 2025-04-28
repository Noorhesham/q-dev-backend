import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";


export const dynamic = "force-dynamic";

const Page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  return <MaxWidthWrapper className="flex px-4 flex-col mt-5"></MaxWidthWrapper>;
};

export default Page;
