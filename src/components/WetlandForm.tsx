import { IonCol, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonTextarea } from "@ionic/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { post } from "../interfaces/interfaces";

interface wetlandFormProps{
    categories: {name: string, value: string}[],
    subcategories: {label: string, values: {name: string, value: string}[]}[],
    size ?: string,
}

export const WetlandForm: React.FC<wetlandFormProps> = (props) => {
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<post>();
    const onSubmit = handleSubmit(data => console.log(data));

    return (
        <form onSubmit={onSubmit}>
            <IonCol size={props.size ? props.size : "12"} className={"ion-nowrap nowarp"}>
            {/* Categorias */}
            <IonItem>
                <IonLabel>Categoria:</IonLabel>
                <IonSelect placeholder="Tipo de publicacion">
                    { props.categories.length > 0 ?
                        props.categories.map((category) => {
                            return (<IonSelectOption value={category.value}>{category.name}</IonSelectOption>)
                        })
                        :
                        <IonSelectOption disabled={true}>Datos no disponibles.</IonSelectOption>
                    }
                </IonSelect>
            </IonItem>
            {/* OpcionesxCatergoria = Subcategorias */}
            { props.subcategories.length > 0 ?
                props.subcategories.map((item) => {
                    <IonItem>
                    <IonLabel>{item.label}</IonLabel>
                    <IonSelect>
                        { item.values.length > 0 ?
                            item.values.map((subcategory) => {
                                return (<IonSelectOption value={subcategory.value}>{subcategory.name}</IonSelectOption>)
                            })
                            :
                            <IonSelectOption disabled={true}>Datos no disponibles.</IonSelectOption>
                        }
                    </IonSelect>
                </IonItem>
                })
                :
                null
            }
            <IonItem>
                <IonLabel>Titulo:</IonLabel>
                <IonInput placeholder={"Ingrese un titulo."}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel className={"ion-align-self-start"}>Descripcion:</IonLabel>
                <IonTextarea></IonTextarea>
            </IonItem>
            <IonItem>
                <IonLabel>Ubicacion:</IonLabel>
                <IonInput placeholder={"Ingrese la latitud:"}></IonInput>
                <IonInput placeholder={"Ingrese la longitud:"}></IonInput>
            </IonItem>
            </IonCol>
        </form>
    );
}