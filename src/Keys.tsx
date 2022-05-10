import { useEffect, useState } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [isClicked, setClicked] = useState(false);
    const [sort, setSorting] = useState(props.sorting);
    const [id, setId] = useState(-1);
    const [str, setStr] = useState('');
    const [arr, setArr] = useState(props.initialData);

    useEffect(() => {
        if (props.sorting === 'ASC') {
            setArr(arr.sort((x, y) => x.id - y.id));
            setSorting(props.sorting);
        }
        if (props.sorting === 'DESC') {
            setArr(arr.sort((x, y) => y.id - x.id));
            setSorting(props.sorting);
        }
    }, [props.sorting]);

    return (
        <div>
            {arr.map((item) => {
                if (!isClicked || item.id !== id)
                    return (
                        <div
                            key={item.id}
                            onClick={() => {
                                setClicked(true);
                                setId(item.id);
                            }}
                        >
                            {item.name}
                        </div>
                    );

                return (
                    <input
                        defaultValue={item.name}
                        key={item.id}
                        type="text"
                        onChange={(event) => setStr(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Escape') {
                                setClicked(false);
                            }
                            if (event.key === 'Enter') {
                                arr.map((elem) => {
                                    if (elem.id === item.id) {
                                        elem.name = str;
                                    }
                                });
                                setArr(arr);
                                setClicked(false);
                            }
                        }}
                    />
                );
            })}
        </div>
    );
}
