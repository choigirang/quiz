type DesProps = {
  selected: boolean;
  data: string[];
};

/** 24/06/10 - each description in all page */
export default function EachDes({ selected, data }: DesProps) {
  return (
    <ul
      className={`flex flex-col gap-1 ${selected ? 'h-fit p-5' : 'h-0 px-5'} w-full bg-defaultWhite text-defaultBlack transition-default rounded-b-md`}
    >
      {selected && data.map((each, idx) => <li key={`des ${idx}`}>{each}</li>)}
    </ul>
  );
}
