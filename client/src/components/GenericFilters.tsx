import { IonButton, IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react"
import { useEffect, useState } from "react"
import { genericFilter } from "../interfaces/interfaces";

interface Filters {
    filters: {title: string, placeholder?: string, multiple?: boolean, type?: string, items: {name: string, value: string}[] }[],
    getFilters: (appliedFilters: genericFilter[]) => void;
}

export const GenericFilters: React.FC <Filters> = (props:Filters) => {
    const [appliedFilters, setAppliedFilters ] = useState<genericFilter[]>([]);
    const [ ionSelectValues, setIonSelectValues ] = useState<[][]>([])

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

    const updateIonSelectValues = (index: number, values: any) => {
        if (!index || typeof(index) !== 'number' || index < 0 || !values) return;
        const auxIonSelectValues = ionSelectValues;
        auxIonSelectValues[index] = values;
        setIonSelectValues(auxIonSelectValues);
    }

    const cleanFilters = () => {
        setAppliedFilters([]);
        setIonSelectValues([])
    }

    return (
        <>
            {
                props.filters.length > 0 ?
                props.filters.map((filter, index) => {
                    if (!filter.title || filter.title === '' || !filter.items || !Array.isArray(filter.items)) return null;
                    const type = filter.type ? filter.type : filter.title.toString().replaceAll(' ', '-');
                    return (
                        <IonItem key={`IonItem-${type}-${index}`}>
                            <IonLabel position={'stacked'}>{filter.title}:</IonLabel>
                            <IonSelect placeholder={filter.placeholder ? filter.placeholder : ''} multiple={filter.multiple ? filter.multiple : false} 
                                onIonChange={e => {updateIonSelectValues(index+1, e.detail.value); updateFilter(e.detail.value, type)}} value={ionSelectValues[index+1]}>
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
            <IonItem key={`IonItem-remove-filters`}>
                <IonButton slot={'end'} color={'danger'} fill={'clear'} onClick={() => cleanFilters()}>Limpiar filtros</IonButton>
            </IonItem>
        </>
    )
}