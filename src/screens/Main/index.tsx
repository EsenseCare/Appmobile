import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Alert } from 'react-native'
import { ButtonSchedule } from "../../components/ButtonSchedule";
import { TasksList } from "../../components/HighlightTasks/Index";
import { InstitutionSelectModal } from "../../components/InstitutionSelectModal/Index";
import { Container, FinishAllTasks, Header, HeaderText } from "./styles";

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";
import { useAuth } from "../../hooks/auth";

interface ScheduleProps {
    key: string
    title: string
}

interface TaskProps {
    id: number;
    patientName: string;
    taskName: string;
    executors: string;
    institutionName: string;
    generalObservations: string;
    planType: string;
    time: string;
    started: boolean;
    risk: boolean;
    levelRiskMorse: string;
    levelRiskBarden: string;
}

export function Dashboard(){
    const [hours, setHours] = useState<ScheduleProps[]>([]);
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [institutions, setInstitutions] = useState<[]>([]);
    const [calendarVisible, setCalendarVisible] = useState(false);

    const navigation = useNavigation();
    const { signOut } = useAuth();

    useEffect(() => {
        async function fetchSchedule(){
            const { data } = await api.get('schedule');
            setHours([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...data
            ]);
        }

        fetchSchedule();        
    }, [])

    useEffect(() => {
        async function searchForInstitutions(){
            const { data } = await api.get(`institutions`);

            const array = data.map((item: any) => {
                return item.name;
            })

            setInstitutions(array);
        }
        
        searchForInstitutions();        
    }, [])

    useEffect(() => {
        async function fetchTasks(){
            const { data } = await api.get('/caretaker/index');
            setTasks(data);
        }

        fetchTasks();
    }, [])

     const logOut = () => {
        Alert.alert(
            '',
            'Deseja sair da conta?',
            [
                {text: 'Cancelar', onPress: () => null, style: 'cancel',},
                {text: 'OK', onPress: async () => signOut()},
            ],
            { cancelable: true }
        )
    }

    const showDatePicker = () => {
        setCalendarVisible(true);
    };    
    const hideDatePicker = () => {
        setCalendarVisible(false);
    };

    const handleConfirm = (selectDate: Date) => {
        hideDatePicker();
        console.log(selectDate);
    };

    return(
        <Container>          
            <Header>
                <View style={
                    {
                        flexDirection: 'row', 
                        alignItems: 'center',                  
                        padding: 16,
                        justifyContent: 'space-between'
                    }}>
                        <HeaderText>
                            Programação {'\n'}
                            do Dia
                        </HeaderText>   
                    <View style={
                        {
                            flexDirection: 'row', 
                            alignItems: 'center',                  
                            justifyContent: 'flex-end',
                            paddingTop: 40,
                            width: 156
                        }
                    }>
                        <MaterialIcons 
                            name="exit-to-app" 
                            size={52} 
                            color="#ffffff"
                            style={{transform: [{ scaleX: -1 }], alignSelf: 'flex-end'}} 
                            onPress={logOut}
                        />               
                        <AntDesign
                            name="calendar" 
                            size={47} 
                            color="#ffffff"
                            style={{marginLeft: 16, marginBottom: 2}}
                            onPress={showDatePicker}
                        />  
                    </View>                   
                </View>
            </Header>
            
            <View style={
                {
                    justifyContent: 'space-between',
                    flexDirection: 'row',                    
                    alignItems: 'center',
                }
            }
            >
            <InstitutionSelectModal 
                institutionsName={institutions}               
            />

            <FinishAllTasks>
                <Text style={{color: '#fff', fontSize: 17 }}>
                    Concluir atividades do horário
                </Text>
            </FinishAllTasks>
            </View>

            <View style={{padding: 5}}>
                {calendarVisible && 
                    <DateTimePickerModal 
                        isVisible={calendarVisible}
                        mode="date"
                        display="default"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}                                               
                    />
                }

                <FlatList
                    data={hours}
                    renderItem={({item}) => (
                        <ButtonSchedule 
                            time={item.title}                        
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>          
                <View style={{flex: 1}}>
                    <FlatList
                        data={tasks}
                        renderItem={({ item }) =>(
                            <TasksList 
                                data={item}
                                
                            />
                        )}                                          
                        showsVerticalScrollIndicator={false}
                    />
                </View>                  
        </Container>
    )
}