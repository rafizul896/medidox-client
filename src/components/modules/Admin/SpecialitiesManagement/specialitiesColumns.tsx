import { IColumn } from "@/components/shared/ManagementTable";
import { ISpeciality } from "../../../../../types/specialities.interface";
import Image from "next/image";


export const specialitiesColumns: IColumn<ISpeciality>[] = [
  {
    header: "Icon",
    accessor: (speciality) => (
      <Image
        src={speciality.icon as string}
        alt={speciality.title}
        width={40}
        height={40}
        className="rounded-full"
      />
    ),
  },
  {
    header: "Title",
    accessor: (speciality) => speciality.title,
  },
];