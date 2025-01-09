import { useGetAllTags } from "@/services/queries/tags";
import { Tags } from "@/types/commonTypes";

export const useTags = () => {
  const allTagsData = useGetAllTags();
  const data: Tags[] = allTagsData?.data?.data || [];

  const sortedData = data.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return dateB.getTime() - dateA.getTime();
  });

  return { data: sortedData };
};
