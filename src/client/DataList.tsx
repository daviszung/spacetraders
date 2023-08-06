
type DataListProps = {
    labels: string[];
    data: (string | number)[];
};

export function DataList({ labels, data }: DataListProps) {

    return (
        <div className="flex">
            <ul className="font-semibold text-lg gap-2 mr-8">
                {labels.map((label, index) => 
                <li key={index}>{label.toUpperCase()}</li>
                )}
            </ul>
            <ul className="font-semibold text-lg gap-2 italic text-emerald-600">
                {data.map((data, index) => 
                <li key={index}>{data}</li>
                )}
            </ul>
        </div>
    );
};
