import { PropsWithChildren } from "react";
import ShimmerEffect from "../../ShimmerEffect";

interface BarberSectionProps extends PropsWithChildren {
  isFetching: boolean;
}

export default function BarberSection({ children, isFetching }: BarberSectionProps) {
  return <section className="flex flex-col gap-4 items-start justify-start w-full">{isFetching ? <ShimmerEffect /> : children}</section>;
}
