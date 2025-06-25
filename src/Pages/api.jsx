/*const BASE_URL = 'https://mock.apidog.com/m1/920738-903315-default/market';

export const getCategorias = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Error al obtener las categorías');
  return await res.json();
};
export const getProductoById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Producto no encontrado');
  return await res.json();
};*/

export const getCategorias = async () => {
  const response = await fetch('https://mock.apidog.com/m1/920738-903315-default/market');
  const data = await response.json();
  return data;
};
