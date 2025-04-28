"use client";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function PaginationDemo({ totalPages = 5 }) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const locale = "ar";

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(page);
  }, [searchParams]);

  const handlePageChange = (page) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", page);
    replace(url.toString(), { scroll: false });
    setCurrentPage(page);
  };

  return (
    <div dir="rtl">
      <Pagination className="mt-10 col-span-full">
        <PaginationContent>
          <PaginationItem className="w-fit">
            <button
              className={`rounded-full ${
                currentPage >= totalPages && "cursor-not-allowed"
              } w-fit flex mr-1 md:mr-3 p-1 items-center text-main2 bg-light duration-150 hover:text-white hover:bg-main2`}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) handlePageChange(currentPage - 1);
              }}
            >
              {locale === "ar" ? <ArrowRight className="mr-1" /> : <ArrowLeft className="mr-1" />}
            </button>
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  className={
                    currentPage === page
                      ? "bg-main text-gray-800 rounded-full "
                      : "rounded-full"
                  }
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <button
              className={`rounded-full ${
                currentPage >= totalPages && "cursor-not-allowed"
              } bg-light text-main2 ml-1 md:ml-3 p-1 flex items-center duration-150 hover:text-white hover:bg-main2`}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) handlePageChange(currentPage + 1);
              }}
            >
              {locale === "ar" ? <ArrowLeft className="mr-1" /> : <ArrowRight className="mr-1" />}
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
