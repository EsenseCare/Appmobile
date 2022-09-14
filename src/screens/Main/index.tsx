import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Alert, ActivityIndicator } from 'react-native'
import { ButtonSchedule } from "../../components/ButtonSchedule";
import { TasksList } from "../../components/HighlightTasks/Index";
import { InstitutionSelectModal } from "../../components/InstitutionSelectModal/Index";
import { Container, FinishAllTasks, Header, HeaderText } from "./styles";

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import api from "../../services/api";
import { useAuth } from "../../hooks/auth";
import { Splash } from "../../utils/Splash";

interface ScheduleProps {
    key: string
    title: string
}

interface TaskProps {
    nome: string
    observacao_atividade: string
    executores: [{
        nome: string
        perfil: string
    }]
    instituicao_saude: string
    descricao_atividade: string
    plano: {
        id: number
        created_at: Date
        data_execucao: string
    }
    started: boolean
    risco: boolean
    levelRiskMorse: string
    levelRiskBarden: string
}

export function Dashboard(){
    const [hours, setHours] = useState<ScheduleProps[]>([]);
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [institutions, setInstitutions] = useState<[]>([]);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [date, setDate] = useState('');
    const [filteredInstitution, setFilteredInstitution] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { signOut } = useAuth();

    const filteredTasks = filteredInstitution ? tasks.filter(task => task.instituicao_saude === filteredInstitution) 
    : tasks;

    useEffect(() => {
        async function fetchSchedule(){
            const { data } = await api.get('http://192.168.15.60:3333/schedule');
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
            const { data } = await api.get(`http://192.168.15.60:3333/institutions`);

            const array = data.map((item: any) => {
                return item.name;
            })
            setInstitutions(array);
        }       
        searchForInstitutions();        
    }, [])

    useEffect(() => {
        async function fetchTasks(){
            const { data } = await api.get(`cuidador/index?date=${date || formatDate(new Date())}`);
            setTasks(data.content);
            setLoading(false);
        }
        fetchTasks();
        
    }, [date])

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

    function handleFilteredIntitutions (name: string) {
        setFilteredInstitution(name);
    }

    function formatDate (date: Date) {
        let month = date.getUTCMonth() + 1; 
        let day = date.getUTCDate();
        let year = date.getUTCFullYear();

        return year + "-" + month + "-" + day
    }

    function handleConfirm(selectDate: Date){
        const dateFormatted = formatDate(selectDate)
        setDate(dateFormatted);
        setLoading(true);
        hideDatePicker();
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
                selectInstitution={handleFilteredIntitutions}          
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
                {loading ? 
                        <ActivityIndicator size="large" color="#5abec8" style={{flex: 1}}/> 
                    : 
                    <View style={{flex: 1}}>
                        <FlatList
                            data={filteredTasks}
                            renderItem={({ item }) =>(
                                <TasksList 
                                    data={item}                             
                                />
                            )}                                          
                            showsVerticalScrollIndicator={false}                      
                        />
                </View>}                  
        </Container>
    )
}