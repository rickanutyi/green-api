import styled from '@emotion/styled'
import { colors } from 'shared/theme/colors'

export const PageWrapper = styled('div')({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})

export const AuthForm = styled('form')({
    width: '100%',
    maxWidth: '350px',
    minWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
})

export const Title = styled('h2')({
    fontSize: '40px',
    fontWeight: 600,
    color: colors.white,
    textAlign: 'center'
})