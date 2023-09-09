import {Image, View, Text} from 'react-native'
import {theme} from '../../theme'
import {styles} from './styles'
import clipboard from '../../assets/clipboard.png'

export function Empty() {
  return <View style={styles.emptyContainer}>
    <Image source={clipboard} style={styles.image}/>
    <Text style={styles.textBold}>Você não tem nenhuma tarefa</Text>
    <Text style={[styles.textBold, styles.textRegular]}>Crie tarefas e se organize</Text>
  </View>
}