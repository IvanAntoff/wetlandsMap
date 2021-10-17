import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react"
import { useEffect, useState } from "react"
import { genericFilter } from "../interfaces/interfaces";

interface Filters {
    filters: {title: string, placeholder?: string, multiple?: boolean, items: {name: string, value: string}[] }[],
    getFilters: (appliedFilters: genericFilter[]) => void;
}

export const GenericFilters: React.FC <Filters> = (props:Filters) => {
    const [appliedFilters, setAppliedFilters ] = useState<genericFilter[]>([]);

    const updateFilter = (items: string[], type: string) => {
        if (!items || !Array.isArray(items) || !type || type === '') return;
        const auxFilters = appliedFilters.filter(elm => elm.type !== type);
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (!item || typeof(item) !== 'string' || item === '') continue;
            auxFilters.push({type: type, value: item});
        }
        setAppliedFilters(auxFilters);
    }

    useEffect(() => {
        return props.getFilters(appliedFilters);
    }, [appliedFilters]);

    return (
        <>
            {
                props.filters.length > 0 ?
                props.filters.map((filter, index) => {
                    if (!filter.title || filter.title === '' || !filter.items || !Array.isArray(filter.items)) return null;
                    const type = filter.title.toString().replaceAll(' ', '-');
                    return (
                        <IonItem key={`IonItem-${type}-${index}`}>
                            <IonLabel position={'stacked'}>{filter.title}:</IonLabel>
                            <IonSelect placeholder={filter.placeholder ? filter.placeholder : ''} multiple={filter.multiple ? filter.multiple : false} onIonChange={e => updateFilter(e.detail.value, type)} >
                                { filter.items.length > 0 ?
                                    filter.items.map((item, index) => {
                                        return (<IonSelectOption value={item.value} key={`IonSelectOption-${index}-${type}-${item.name}`}>{item.name}</IonSelectOption>)
                                    })
                                    :
                                    <IonSelectOption disabled={true}>Datos no disponibles.</IonSelectOption>
                                }
                            </IonSelect>
                        </IonItem>
                    )
                }
                )
                : null
            }
        </>
    )
}