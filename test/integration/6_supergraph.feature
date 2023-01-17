Feature: As a customer
	I would like to retrieve the supergraph

  @supergraph
	Scenario: I request the supergraph
		Given the database is imported from 'breakdown_schema_db'
		When I send a "GET" request to "/supergraph"
		Then the response status code should be 200
		And the response should contains the text:
		"""
@link(url: \"https://specs.apollo.dev/join/v0.2\", for: EXECUTION)
		"""
