import React, { useEffect, useState } from "react";
import { View, FlatList, Text, ScrollView, ScrollViewBase } from 'react-native'
import { ButtonSchedule } from "../../components/ButtonSchedule";
import { TasksList } from "../../components/HighlightTasks/Index";
import { MultiSelectInput } from "../../components/MultiSelectInput/Index";
import api from "../../services/api";
import { Container, FinishAllTasks, Header } from "./styles";

interface ScheduleProps {
    key: string
    title: string
}

interface TaskProps {
    id: number
    patientName: string
    taskName: string
    executors: string
    institutionName: string
    generalObservations: string
    planType: string
    time: string
    started: boolean
}

export function Dashboard(){
    const [hours, setHours] = useState<ScheduleProps[]>([]);
    const [tasks, setTasks] = useState<TaskProps[]>([]);

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
        async function fetchTasks(){
            const { data } = await api.get('tasks');
            setTasks(data);
        }

        fetchTasks();
    }, [])

    return(
        <Container>  
          
            <Header>
                
            </Header>
            
            <View style={
                {
                    justifyContent: 'space-between',
                    flexDirection: 'row',                    
                    alignItems: 'center',
                }}
            >
            <MultiSelectInput />

            <FinishAllTasks>
                <Text style={{color: '#fff'}}>
                    Concluir atividades do horário
                </Text>
            </FinishAllTasks>
            </View>

            <View style={{padding: 5}}>
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