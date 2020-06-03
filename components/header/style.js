import { StyleSheet } from 'react-native'
import { APP_COLORS } from '../../styles/colors'

export const style = StyleSheet.create({
    
    subHeader: {
        backgroundColor: APP_COLORS.darkPrimary,
        height: 30
    },
    header: {
        backgroundColor: APP_COLORS.primary,
        height: 150,
        justifyContent: 'center',       //axe Y en rapport avec le parametre par defaut justifyContent: column
        alignItems: 'center',           //axe X en rapport avec le parametre par defaut justifyContent: column
        shadowColor: APP_COLORS.shadow,
        shadowOpacity: 0.2,
        shadowOffset: { height: 10 }    //Pour decaler l'ombre. (Haut Bas Gauche Droite)
    },
    text: {
        color: APP_COLORS.primaryText,
        fontSize: 30
    }

});