import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Table,
  Thead,
  Tbody,
  Td,
  Th,
  Tr,
  TableContainer,
  Text,
  Spinner,
} from "@chakra-ui/react";

export const PlanetsList = () => {
  const [planetsData, setPlanetsData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const getPlanetData = () => {
    setLoading(true)

    fetch('https://swapi.dev/api/planets')
      .then(resp => resp.json())
      .then(data => {
        setPlanetsData(data.results.sort((a, b) => a.name.localeCompare(b.name)))
        setLoading(false)
        setError(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }

  const calculateSurfaceWater = (planet) => {
    if (planet.surface_water === "unknown") {
      return "?"
    }

    return Math.round((4 * Math.PI * (planet.diameter / 2 ** 2)) * (planet.surface_water * 0.01))
  }

  const renderPlanets = planetsData.map((planet, idx) => {
    return (
      <Tr key={idx}>
        <Td>{planet.name}</Td>
        <Td>{planet.climate}</Td>
        <Td>{planet.residents.length}</Td>
        <Td>{planet.terrain}</Td>
        <Td>{planet.population === "unknown" ? "?" : parseInt(planet.population).toLocaleString().replace(/,/g, " ")}</Td>
        <Td>{calculateSurfaceWater(planet)}</Td>
      </Tr>
    )
  })

  useEffect(() => {
    getPlanetData()
  }, [])

  if (loading) {
    return (
      <Grid
        minHeight="80vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          marginBottom="1rem"
        />
        <Text>Loading...</Text>
      </Grid>
    )
  } else if (error) {
    return (
      <Grid
        minHeight="80vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Text>There was an error loading the data, please try again.</Text>
      </Grid>
    )
  } else {
    return (
      <Container maxW="6xl">
        <Text fontSize="4xl">Truss Project</Text>
        <TableContainer overflow="hidden" marginTop="3rem">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Planet Name</Th>
                <Th>Planet Climate</Th>
                <Th>Residents</Th>
                <Th>Terrains</Th>
                <Th>Population</Th>
                <Th>KM² covered by water</Th>
              </Tr>
            </Thead>
            <Tbody>
              {renderPlanets}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    )
  }
}