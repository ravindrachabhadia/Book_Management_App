import { useState, useEffect, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getBookById, updateBook } from '../services/bookService';
import { TextInput, NumberInput, Button, Paper, Title, Container, Alert, Loader, Group, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

const EditBookPage = () => {
  const { id: bookId } = useParams<{ id: string }>(); 
  const { token } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [isbn, setIsbn] = useState<string>('');
  const [publicationYear, setPublicationYear] = useState<string | number>('');
  const [genre, setGenre] = useState<string>('');

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); 
  const [isFetching, setIsFetching] = useState<boolean>(true); 

  useEffect(() => {
    const fetchBookData = async () => {
      if (!bookId || !token) {
        setError('Book ID missing or user not authenticated.');
        setIsFetching(false);
        return;
      }
      try {
        setIsFetching(true);
        setError(null);
        const book = await getBookById(bookId, token);
        setTitle(book.title);
        setAuthor(book.author);
        setIsbn(book.isbn || '');
        setPublicationYear(book.publicationYear?.toString() || '');
        setGenre(book.genre || '');
      } catch (err: unknown) { // <-- Fixed: unknown type
        console.error('Failed to fetch book data:', err);
        let message = 'Failed to load book data for editing.';
         if (err instanceof Error) {
             message = err.message; // <-- Added type check
         } else if (typeof err === 'string') {
             message = err;
         }
        setError(message);
      } finally {
        setIsFetching(false);
      }
    };
    fetchBookData();
  }, [bookId, token]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!token || !bookId) {
      setError('Authentication error or missing book ID.');
      setIsLoading(false);
      return;
    }

    const updatedData = {
      title,
      author,
      isbn: isbn || undefined,
      publicationYear: publicationYear ? Number(publicationYear) : undefined,
      genre: genre || undefined,
    };

    if (publicationYear && isNaN(updatedData.publicationYear!)) {
        setError('Publication Year must be a valid number.');
        setIsLoading(false);
        return;
   }

    try {
      await updateBook(bookId, updatedData, token);
      console.log('Book updated successfully');
      navigate('/'); 
    } catch (err: unknown) { // <-- Fixed: unknown type
      console.error('Failed to update book:', err);
       let message = 'Failed to update book.';
         if (err instanceof Error) {
             message = err.message; // <-- Added type check
         } else if (typeof err === 'string') {
             message = err;
         }
      setError(message);
      setIsLoading(false);
    }
    // No finally here, isLoading is reset on error or navigation occurs on success
  };

  if (isFetching) {
    return (
       <Container size="xs" px="xs" style={{ marginTop: '50px', textAlign: 'center' }}>
          <Loader />
          <Text>Loading book details...</Text>
       </Container>
    );
  }

  if (error && !title && !isFetching) { 
    return (
       <Container size="xs" px="xs" style={{ marginTop: '50px' }}>
          <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red">
            {error}
          </Alert>
       </Container>
    );
  }

  return (
    <Container size="xs" px="xs" style={{ marginTop: '50px' }}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title order={2} ta="center" mb="xl">
          Edit Book
        </Title>
        <form onSubmit={handleSubmit}>
           <TextInput label="Title" placeholder="Book title" required value={title} onChange={(event) => setTitle(event.currentTarget.value)} disabled={isLoading || isFetching} mb="md" />
           <TextInput label="Author" placeholder="Author's name" required value={author} onChange={(event) => setAuthor(event.currentTarget.value)} disabled={isLoading || isFetching} mb="md" />
           <TextInput label="ISBN" placeholder="ISBN (optional)" value={isbn} onChange={(event) => setIsbn(event.currentTarget.value)} disabled={isLoading || isFetching} mb="md" />
           <NumberInput label="Publication Year" placeholder="Year (optional)" value={publicationYear} onChange={setPublicationYear} disabled={isLoading || isFetching} mb="md" hideControls />
           <TextInput label="Genre" placeholder="Genre (optional)" value={genre} onChange={(event) => setGenre(event.currentTarget.value)} disabled={isLoading || isFetching} mb="lg" />

           {error && ( <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red" withCloseButton onClose={() => setError(null)} mb="md"> {error} </Alert> )}

           <Group justify="flex-end" mt="xl">
             <Button variant="default" onClick={() => navigate('/')} disabled={isLoading || isFetching}> Cancel </Button>
             <Button type="submit" loading={isLoading} disabled={isFetching}> Save Changes </Button>
           </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default EditBookPage;