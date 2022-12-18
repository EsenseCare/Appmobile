import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Alert, ActivityIndicator } from 'react-native'
import { ButtonSchedule } from "../../components/ButtonSchedule";
import { TasksList } from "../../components/HighlightTasks/Index";
import { InstitutionSelectModal } from "../../components/InstitutionSelectModal/Index";
import { ClearFilters, Container, FilterInfo, FilterInfoText, FinishAllTasks, Header, HeaderText, IconView, Warning} from "./styles";
import { useNavigation } from '@react-navigation/native'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import api from "../../services/api";
import { useAuth } from "../../hooks/auth";
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
        paciente_id: number;
        created_at: Date;
        data_execucao: string;
    }
    started: boolean;
    risco: boolean;
    data_horario_inicio: any;
    protocolos: [string];
}

export type RootStackParamList = {
    YourScreen: { id: number } | undefined;
};

export function Dashboard(){
    const [hours, setHours] = useState<any>([]);
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [institutions, setInstitutions] = useState<any>([]);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [date, setDate] = useState('');
    const [click, setClick] = useState<any>(null);
    const [filteredInstitution, setFilteredInstitution] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState<TaskProps[]>([]);
    const [filteredTime, setFilteredTime] = useState<string | null>(null);

    const { signOut, isConnected } = useAuth();

    const realDate = date.split('-').reverse().join('/');
    const navigate = useNavigation<any>(); 

    function taskTime (date: Date) {
        let hour = date.getHours();
        let minute = date.getMinutes();
        let minuteFormatted = date.getMinutes() <10? '0' + minute : minute
        return hour + ":" + minuteFormatted
    }

    useEffect(() => {

        if(filteredTime === "Todos"){       
            setFilteredTime(null);
        }
   
        let data = filteredInstitution 
        ? tasks.filter(task => task.instituicao_saude === filteredInstitution)
        : tasks;

        data = filteredTime 
        ? tasks.filter(task => task.data_horario_inicio && task.data_horario_inicio.includes(`T${filteredTime}`))
        : data;

        setFilteredTasks(data);
        setLoading(false);
        
    },[filteredInstitution, tasks, filteredTime])

    useEffect(() => {
        function disableButtonFunction(){
            if(tasks.length < 1){
                return setDisableButton(true)
            }
            setDisableButton(false);
        }

        disableButtonFunction();
    },[tasks]);

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

            hourTaskFormatted.sort((a:any, b:any) => {
                if(a.title < b.title) { return -1; }
                if(a.title > b.title) { return 1; }
                return 0;
            });

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
        setFilteredInstitution(null);
        setFilteredTime(null);
        setClick(null);

        async function fetchTasks(){
            setLoading(true);
            try {
                const { data } = await api.get(`/cuidador/plano-atividades?date=${date || formatDate(new Date())}`);
                setTasks(data.content);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
                setDisableButton(true);  
            }        
        }
        fetchTasks();
        setError(false);
      
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

        let monthFormatted = month < 10 ? '0'+ month : month;
        let dayFormatted = day< 10 ? '0'+ day : day;
        return year + "-" + monthFormatted + "-" + dayFormatted
    }

    function handleConfirm(selectDate: Date){
        const dateFormatted = formatDate(selectDate);
        if(dateFormatted === date){
            return hideDatePicker();
        }
        setDate(dateFormatted);
        setLoading(true);
        hideDatePicker();
    };

    function filterByHours(time: string){
        setFilteredTime(time);
    }

    function renderItem({item, index}: any){
        return(   
            <ButtonSchedule 
            time={item.title}
            onPressFunction={(time) => { 
                filterByHours(time); 
                setClick(index); 
                return setLoading(true)}}
            widthColor={index === click ? 'black': ''}
            disabled={disableButton}
        /> 
        )  
    }

    function renderTask({item}: any){
        return (
            <TasksList 
            info={item}
        />
        )
    }

    const disableFinishTasks = (value: boolean) => {
        if(value){
            return true;
        }
        return false;
    }

    return(
        <Container>
            <Header>
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
                                <Text style={{color:'white', marginBottom: -2}}>Calendário</Text> 
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
            {!isConnected ? 
                <Warning>
                    <FontAwesome name="warning" size={26} style={{marginLeft: 10, color: 'white'}}/>
                    <Text style={{color: 'white', fontSize: 16, marginLeft: 10}}>Sem conexão com a internet!</Text>
                </Warning> 
            : null}
            
            <View style={
                {
                    justifyContent: 'space-between',
                    flexDirection: 'row',                    
                    alignItems: 'center',
                }
            }>
            <InstitutionSelectModal 
                homecares={institutions}
                selectInstitution={handleFilteredIntitutions}          
            />

            <FinishAllTasks disabled={disableFinishTasks(loading)} onPress={() => navigate.navigate('FinishAllTasks' ,{
                filteredTasksParams: filteredTasks.map(task => ({
                    nome: task.nome,
                    descricao_atividade: task.descricao_atividade,
                    protocolos: task.protocolos
                }))
            })}>
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

               {loading ? <ActivityIndicator size="large" color="#5abec8"/> 
                 :  <FlatList
                        data={hours}
                        keyExtractor={(item) => String(item.key)}
                        renderItem={renderItem}
                        horizontal
                        showsHorizontalScrollIndicator={false} 
                    />
                 }

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
                {loading
                ? 
                    <ActivityIndicator size="large" color="#5abec8" style={{flex: 1, marginBottom: 80}}/> 
                : 
                    <View style={{flex: 1}}>
                       {tasks.length ? 
                       <FlatList
                            data={filteredTasks}
                            initialNumToRender={3}
                            keyExtractor={(item) => String(item.id)}
                            renderItem={renderTask}                                          
                            showsVerticalScrollIndicator={false}
                            windowSize={5}
                            maxToRenderPerBatch={5}
    
                        />: <NoTasksScreen serverError={error}/>}                     
                </View>}                  
        </Container>
    )
}