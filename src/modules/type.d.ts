interface IDataItem {
    id: number;
    name: string;
    disabled?: boolean;
    checked: boolean,
}
interface IData{
    title: string;
    data: IDataItem[];
}

interface LeftAndRightData {
    left: IDataItem[];
    right: IDataItem[];
}

