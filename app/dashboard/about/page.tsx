// app/about-us/page.tsx
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import { DataTable } from "@/app/components/DataTable";
import connect from "@/app/utils/clientPromise";
import { aboutUsColumns } from "./columns";
import { deleteEntity } from "@/app/actions/actions";
import About from "@/app/models/About";

export const dynamic = "force-dynamic";

const Page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  await connect();
  const aboutUsData = await About.find({}).skip((+searchParams.page - 1) * 10).limit(10);
  const dataObj = JSON.parse(JSON.stringify(aboutUsData || []));
  const count = await About.countDocuments();
  const totalPages = Math.ceil(count / 10);
  console.log(dataObj);
  return (
    <MaxWidthWrapper className="flex px-4 flex-col mt-5">
      <DataTable
        handleDeleteAll={deleteEntity}
        totalPages={totalPages}
        columns={aboutUsColumns}
        data={dataObj}
        entity="About"
        page={1}
      />
    </MaxWidthWrapper>
  );
};

export default Page;
