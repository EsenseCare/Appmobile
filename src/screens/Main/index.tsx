import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Alert, ActivityIndicator } from 'react-native'
import { ButtonSchedule } from "../../components/ButtonSchedule";
import { TasksList } from "../../components/HighlightTasks/Index";
import { InstitutionSelectModal } from "../../components/InstitutionSelectModal/Index";
import { ClearFilters, Container, FilterInfo, FilterInfoText, FinishAllTasks, Header, HeaderText, IconView, Warning} from "./styles";

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import api from "../../services/api";
import { useAuth } from "../../hooks/auth";
import {  } from "../../utils/Splash";
import { NoTasksScreen } from "../../utils/NoTasksScreen";

interface TaskProps {
    nome: string;
    id: string;
    observacoes_gerais: string;
    executores: [{
        nome: string;
        perfil: string;
    }]
    instituicao_saude: string;
    descricao_atividade: string;
    plano: {
        id: number;
        created_at: Date;
        data_execucao: string;
    }
    started: boolean;
    risco: boolean;
    data_horario_inicio: any;
    levelRiskMorse: string;
    levelRiskBarden: string;
}

export function Dashboard(){
    const [hours, setHours] = useState<any>([]);
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [institutions, setInstitutions] = useState<any>([]);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [date, setDate] = useState('');
    const [filteredInstitution, setFilteredInstitution] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState<TaskProps[]>([]);
    const [filteredTime, setFilteredTime] = useState<string | null>(null);

    const { signOut, isConnected } = useAuth();

    const realDate = date.split('-').reverse().join('/');

    function taskTime (date: Date) {
        let hour = date.getHours();
        let minute = date.getMinutes();
        let minuteFormatted = date.getMinutes() <10? '0' + minute : minute
        return hour + ":" + minuteFormatted
    }

    useEffect(() => {
   
        let data = filteredInstitution 
        ? tasks.filter(task => task.instituicao_saude === filteredInstitution)
        : tasks;

        data = filteredTime 
        ? tasks.filter(task => task.data_horario_inicio.includes(`T${filteredTime}`))
        : data;
    
        setFilteredTasks(data);
    

    },[filteredInstitution, tasks, filteredTime])

    useEffect(() => {
        async function fetchSchedule(){
            const { data } = await api.get(`/cuidador/plano-atividades?date=${date || formatDate(new Date())}`);
            const hourTask = data.content.map((item: any) => {
                return taskTime(new Date(item.data_horario_inicio));
            });
        
            const hourTaskFormatted = hourTask.map((item: string, index: number) => {
                return {
                    key: index,
                    title: item
                }
            })
            setHours([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...hourTaskFormatted
            ]);
        }
        fetchSchedule();        
    }, [filteredTasks]);

    useEffect(() => {
        async function searchForInstitutions(){
            const { data } = await api.get(`/cuidador/homecares`);

            const array = data.content.map((item: any) => {
                return item.descricao;
            })
            
            setInstitutions(array);   
        }       
        searchForInstitutions();        
    }, []);

    useEffect(() => {
        async function fetchTasks(){
            try {
                const { data } = await api.get(`/cuidador/plano-atividades?date=${date || formatDate(new Date())}`);
                setTasks(data.content);
                setLoading(false);

            } catch (error) {
                setLoading(false);
                setError(true);
            }        
        }
        fetchTasks();
        setError(false);
        setFilteredInstitution(null);
        setFilteredTime(null);
        
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

    const clearFilters = () => {
        setLoading(false);
        setFilteredInstitution(null);
        setDate(formatDate(new Date()));
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
        date.setHours(date.getHours() - 3);
        let month = date.getUTCMonth() + 1; 
        let day = date.getUTCDate();
        let year = date.getUTCFullYear();

        return year + "-" + month + "-" + day
    }

    function handleConfirm(selectDate: Date){
        const dateFormatted = formatDate(selectDate);
        if(dateFormatted === date){
            return hideDatePicker();
        }
        setDate(dateFormatted);
        setLoading(true);
        hideDatePicker();
        console.log(selectDate);
    };

    //"data_horario_inicio": "2022-10-26T15:01:15.864-03:00"
    function filterByHours(time: string){
        setFilteredTime(time);
    }

    return(
        <Container>
            <Header>
                {!isConnected ? 
                <Warning>
                    <FontAwesome name="warning" size={26} style={{marginLeft: 10, color: 'white'}}/>
                    <Text style={{color: 'white', fontSize: 16, marginLeft: 10}}>Sem conexão com a internet!</Text>
                </Warning> 
                : null}
                <View style={{
                        flexDirection: 'row', 
                        alignItems: 'center',                  
                        padding: 16,
                        justifyContent: 'space-between'                       
                    }}>
                    <HeaderText>
                        Programação {'\n'}
                        do Dia
                    </HeaderText>  

                    <IconView>
                            <View>
                                <AntDesign
                                    name="calendar" 
                                    size={45} 
                                    color="#ffffff"
                                    style={{marginLeft: 16, marginBottom: 2}}
                                    onPress={showDatePicker}
                                />
                                <Text style={{color:'white', marginBottom: -1}}>Calendário</Text> 
                            </View>
                                <View>
                                    <MaterialIcons 
                                        name="exit-to-app" 
                                        size={50} 
                                        color="#ffffff"
                                        style={{transform: [{ scaleX: -1 }], alignSelf: 'flex-end'}} 
                                        onPress={logOut}
                                    />
                                    <Text style={{marginLeft: 12, color:'white'}}>Sair</Text>
                            </View>                              
                    </IconView>                                   
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
                homecares={institutions}
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
                            onPressFunction={(time) => filterByHours(time)}                        
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />

                <FilterInfo>
                    <Text style={{fontSize: 16, color: '#5AABB4', marginBottom: 6}}>Filtros</Text>
                        <View style={{flexDirection: 'row', marginBottom: 3}}>
                            <Text style={{fontSize: 16}}>Data: </Text> 
                            <FilterInfoText>{
                                realDate || formatDate(new Date()).split('-').reverse().join('/')
                            }
                            </FilterInfoText>
                        </View> 
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 16}}>Instituição: </Text>
                            <FilterInfoText>{
                                filteredInstitution || 'Não selecionado'
                            }
                            </FilterInfoText>
                        </View>
                        <ClearFilters onPress={clearFilters}>
                                    <Text style={{color: 'white'}}>Limpar Filtros</Text>
                        </ClearFilters>                  
                </FilterInfo>

            </View>          
                {loading ? <ActivityIndicator size="large" color="#5abec8" style={{flex: 1, marginBottom: 80}}/> 
                    : 
                    <View style={{flex: 1}}>
                       {tasks.length ? <FlatList
                            data={filteredTasks}
                            renderItem={({ item }) =>(
                                <TasksList 
                                    info={item}                             
                                />
                            )}                                          
                            showsVerticalScrollIndicator={false}

                        />: <NoTasksScreen serverError={error}/>}
                </View>}                  
        </Container>
    )
}