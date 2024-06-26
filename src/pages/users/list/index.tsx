import { useGetUsers } from "../../../hooks/useGetUsers";
import { UserDto } from '../../../types/user';
import { useState } from 'react';
import { checkLoginStatus } from '../../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { Heading } from "../../../components/common/heading";
import styled from "styled-components";
import { Table } from "../../../components/common/table";
import { Wrapper } from "../../../components/common/wrapper";
import { Cta } from "../../../components/common/cta";
import { Spinner } from "../../../components/common/spinner";

const CustomHeading = styled(Heading)`
    font-size: 1.5rem;

    & span {
        display: inline-block;
    }
`;

const Container = styled.main`
    width: 100%;
    max-width: 70cqw;
    margin: 0 auto;
`;

export default function UsersList() {
    const navigate = useNavigate();
    if (!checkLoginStatus()) navigate('/login', { replace: true })

    // Define the offset of the pagination
    const [offset, setOffset] = useState(0);
    const { data, loading, error } = useGetUsers({ offset });

    return (
        <Container>
            <Wrapper $dir="column">
                <CustomHeading as="h2">Lista de <span className='highlight'>Usuários</span></CustomHeading>
                <Table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.users.nodes.map((user: UserDto) => (
                            <tr onClick={() => navigate(`/users/user/${user.id}`)} key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                        {loading && (
                            <tr>
                                <Wrapper as="td" $align="center" $justify="center">
                                    <Spinner />
                                    Carregando...
                                </Wrapper>
                                <td></td>
                            </tr>)}
                    </tbody>
                    <Wrapper>
                        <Cta disabled={offset <= 0} onClick={() => setOffset(() => offset - 10)}>Anterior</Cta>
                        <Cta disabled={!!error || loading} onClick={() => setOffset(() => offset + 10)}>Próximo</Cta>
                    </Wrapper>
                </Table>
            </Wrapper>
        </Container>
    )
}
