import "./checkBoxList.scss";
import React, {useState} from "react";

interface CheckboxItem {
    id: number;
    label: string;
}

interface CheckboxListProps {
    items: CheckboxItem[];
    selectedIdList: number[];
    onSelectedChange: (selectedIds: number[]) => void;
}

const CheckBoxList:React.FC<CheckboxListProps> = ({ items, onSelectedChange, selectedIdList }) => {

    const [selectedIds, setSelectedIds] = useState<number[]>(selectedIdList);

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
        <div className="checkbox-container">
            <div className="checkbox-item-container">
                {items.map((item) => (
                    <div key={item.id} className="checkbox-item">
                        <input
                            type="checkbox"
                            checked={selectedIdList.includes(item.id)}
                            value={item.id}
                            onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                        />
                        <label>
                            {item.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default CheckBoxList;