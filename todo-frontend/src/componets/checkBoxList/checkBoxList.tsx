import "./checkBoxList.scss";
import React, {useState} from "react";

interface CheckboxItem {
    id: number;
    label: string;
}

interface CheckboxListProps {
    items: CheckboxItem[];
    onSelectedChange: (selectedIds: number[]) => void;
}

const CheckBoxList:React.FC<CheckboxListProps> = ({ items, onSelectedChange }) => {

    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const handleCheckboxChange = (id: number, checked: boolean) => {
        let updatedSelectedIds;

        if (checked) {
            updatedSelectedIds = [...selectedIds, id];
        } else {
            updatedSelectedIds = selectedIds.filter((selectedId) => selectedId !== id);
        }

        setSelectedIds(updatedSelectedIds);
        onSelectedChange(updatedSelectedIds); // Emit the updated list
    };

    return (
        <div>
            {items.map((item) => (
                <div key={item.id}>
                    <label>
                        <input
                            type="checkbox"
                            value={item.id}
                            onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                        />
                        {item.label}
                    </label>
                </div>
            ))}
        </div>
    );

}