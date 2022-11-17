package com.iovision.stile.services;

import java.util.ArrayList;
import java.util.List;

import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.unit.Fuzziness;
import org.elasticsearch.index.query.MultiMatchQueryBuilder;
import org.elasticsearch.index.query.Operator;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Service;

import com.iovision.stile.entities.dto.clothDTO;
import com.iovision.stile.entities.dto.searchDataDto;

@Service
public class ElasticSearchService {


	 // private static final String CLOTHES_INDEX = "cloth";

	  @Autowired
	  private  ElasticsearchOperations elasticsearchOperations;

	  @Autowired
	    private RestHighLevelClient elasticStackclient;
	  
	  /* ---------------suggestions--------------*/

	//public List<List<String>> fetchSuggestions(String query) {
		public List<String> fetchSuggestions(String query) {  
	/*  MultiMatchQueryBuilder csvqueryBuilder = 
			  QueryBuilders.multiMatchQuery(query,"productDisplayName","productDisplayName._2gram","productDisplayName._3gram","productDisplayName._index_prefix").fuzziness(Fuzziness.AUTO);
	  			csvqueryBuilder.operator(Operator.AND);
	  		  NativeSearchQuery csvsearchQuery = new NativeSearchQueryBuilder()
				      .withFilter(csvqueryBuilder)
				    //  .withMinScore(1)
				      .withHighlightBuilder(new HighlightBuilder().field("productDisplayName"))
				      .withPageable(PageRequest.of(0,5))
				      
				      .withHighlightBuilder(new HighlightBuilder().forceSource(true))
				      .build();
	  		  
	  		SearchHits<searchDataDto> csvSuggestions = 
				    this.elasticsearchOperations.search(csvsearchQuery,searchDataDto.class,IndexCoordinates.of("csv"));
	  	    csvSuggestions.forEach(searchHit->{
		    	String suggestion = "";
		    	for(int i =0; i < gender.length; i++)
		        {
		            if(searchHit.getContent().getProductDisplayName().contains(gender[i]))
		            {
		            suggestion = searchHit.getContent().getProductDisplayName().replace(gender[i]+" ","");
		            }
		        } 
		    	if (suggestion=="") {
		    		 suggestion = searchHit.getContent().getProductDisplayName();
				}
		    	 clothMatches.add(suggestion);
		    	});*/
	  //	  QueryBuilders.multiMatchQuery(query,"productDisplayName","productDisplayName._2gram","productDisplayName._3gram","productDisplayName._index_prefix","productDisplayName.shingles")
		 //     QueryBuilders.wildcardQuery("productDisplayName",query+"*");
			   
	    
			  
		//	QueryBuilders.matchBoolPrefixQuery("productDisplayName",query).fuzziness(Fuzziness.AUTO);
	  	 //   QueryBuilders.matchBoolPrefixQuery("productDisplayName._2gram",query).fuzziness(Fuzziness.AUTO);
	  	 //   QueryBuilders.matchBoolPrefixQuery("productDisplayName._3gram",query).fuzziness(Fuzziness.AUTO);
	  	  //  QueryBuilders.matchBoolPrefixQuery("productDisplayName._index_prefix",query).fuzziness(Fuzziness.AUTO);
		  //  QueryBuilders.matchBoolPrefixQuery("name",query).fuzziness(Fuzziness.AUTO);
		    
	//  	    QueryBuilders.disMaxQuery(); 
	//  	    QueryBuilders.functionScoreQuery(queryBuilder);
	  	    
	  	    
	  	  MultiMatchQueryBuilder clothDtoqueryBuilder = 
	  			 QueryBuilders.multiMatchQuery(query,"name","name._2gram","name._3gram","name._index_prefix").fuzziness(Fuzziness.AUTO);
	  		  //  QueryBuilders.matchBoolPrefixQuery("name",query).fuzziness(Fuzziness.AUTO);
	  	  		// QueryBuilders.matchBoolPrefixQuery("name._2gram",query).fuzziness(Fuzziness.AUTO);
	  	  	//	QueryBuilders.matchBoolPrefixQuery("name._3gram",query).fuzziness(Fuzziness.AUTO);

	  			clothDtoqueryBuilder.operator(Operator.OR);
	  			
	  		    NativeSearchQuery clothDtosearchQuery = new NativeSearchQueryBuilder()
					      .withFilter(clothDtoqueryBuilder)
					    //  .withMinScore(1)
					      .withHighlightBuilder(new HighlightBuilder().field("name"))
					      .withPageable(PageRequest.of(0,5))
					      
					      .withHighlightBuilder(new HighlightBuilder().forceSource(true))
					      .build();
			    
			    SearchHits<clothDTO> clothDtoSuggestions = 
					    this.elasticsearchOperations.search(clothDtosearchQuery,clothDTO.class,IndexCoordinates.of("database"));
			    String[] gender = {"Men","Women","Kids","Men's","Women's","Mens","Womens"};
			    List<String> clothMatches = new ArrayList<String>();
			
			  
			      clothDtoSuggestions.forEach(searchHit->{
			    	  clothMatches.add(searchHit.getContent().getName());
			      });
			    
				  return clothMatches; 
					/* "name",
					 "brandname",
					 "*brandname",
					// "colorname.shingles",
					 "brandname._2gram",
			    	 "brandname._3gram",
			    	 "brandname._index_prefix",
			    	 "colorname",
			    	 "*colorname",
			    //	 "colorname.shingles",
					 "colorname._2gram",
			    	 "colorname._3gram",
			    	 "colorname._index_prefix",
			    	 "categoryname",
			    	 "*categoryname",
			    //	 "categoryname.shingles",
					 "categoryname._2gram",
			    	 "categoryname._3gram",
			    	 "categoryname._index_prefix",
			    	 "shopname",
			    	 "*shopname",
			    //	 "shopname.shingles",
					 "shopname._2gram",
			    	 "shopname._3gram",
			    	 "shopname._index_prefix")*/
					// "colorname","categoryname","shopname")
			// QueryBuilders.matchQuery(query,"name")
			// .fuzziness(Fuzziness.AUTO).fuzzyTranspositions(true)
			// .type(Type.BOOL_PREFIX);
	  	//  queryBuilder.autoGenerateSynonymsPhraseQuery(true);
		  
		 // queryBuilder.tieBreaker();
		 
		
	 	

		  /*  SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
		    searchSourceBuilder.query(csvqueryBuilder);
		    searchSourceBuilder.sort(new ScoreSortBuilder().order(SortOrder.DESC));
		    */
			    
			    
			    
			    
			    
			
			    
			   // List<List<String>> suggestions = new ArrayList<List<String>>();
			    
			  /*  List<String> Name = new ArrayList<String>();
			    List<String> Brandname = new ArrayList<String>();
			    List<String> Colorname = new ArrayList<String>();
			    List<String> Categoryname = new ArrayList<String>();
			    List<String> Shopname = new ArrayList<String>(); */
			
			    
			  /*  searchSuggestions.getSearchHits().forEach(searchHit->{
			    Name.add(searchHit.getContent().getName());
			    Brandname.add(searchHit.getContent().getBrandname());
			    Colorname.add(searchHit.getContent().getColorname());
			    Categoryname.add(searchHit.getContent().getCategoryname());
			    Shopname.add(searchHit.getContent().getShopname());
			    });
			    suggestions.add(Name);
			    suggestions.add(Brandname);
			    suggestions.add(Colorname);
			    suggestions.add(Categoryname);
			    suggestions.add(Shopname);*/

				  
			 //   return suggestions;
			  }
		  /*  WildcardQueryBuilder queryBuilder = QueryBuilders
		      .wildcardQuery("texts", query+"*");
		      
		     "name",
		    		"name._2gram",
		    		"name._3gram"
		    		  */
		
	/*	  SearchRequest searchRequest = new SearchRequest();
		  searchRequest.indices("dataset");
		  SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
		  BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
		 
		  searchSourceBuilder.suggest(new SuggestBuilder()
		          .addSuggestion( "categoryname",SuggestBuilders.completionSuggestion("categoryname").prefix(query)
		          .skipDuplicates(true)));*/

		      // add source field
		     
	/*	  boolQueryBuilder.should(QueryBuilders.wildcardQuery("brandname", query+"?").boost(2f));
		  boolQueryBuilder.should(QueryBuilders.wildcardQuery("colorname", query+"?").boost(0.7f));
		  boolQueryBuilder.should(QueryBuilders.wildcardQuery("categoryname", query+"?").boost(2f));
		  boolQueryBuilder.should(QueryBuilders.wildcardQuery("shopname", query+"?").boost(0.4f)); */
	

	   /*     searchRequest.source(searchSourceBuilder);
	        Map<String, Object> map=null;      
	        List<String> suggestions = new ArrayList<String>();
	        try {
	            SearchResponse searchResponse = null;
	            searchResponse =elasticStackclient.search(searchRequest, RequestOptions.DEFAULT);
	            if (searchResponse.getHits().getTotalHits().value > 0) {
	                SearchHit[] searchHit = searchResponse.getHits().getHits();
	              
	                for (SearchHit hit : searchHit) {
	                    map = hit.getSourceAsMap();
	                      System.out.println("output::"+Arrays.toString(map.entrySet().toArray()));
	                    suggestions.add(map.toString());
	                 
	                }

	            }     
              
	        } catch (IOException e) {
	            e.printStackTrace();
	        } 
	        return suggestions;
	    }*/
		  
	  




	/* ---------------fuzzy--------------*/
	  public Iterable<clothDTO> processSearch(String query) {
		//  log.info("Search with query {}", query);
		  
		  // 1. Create query on multiple fields enabling fuzzy search
		  MultiMatchQueryBuilder queryBuilder = 
		    QueryBuilders
		    .multiMatchQuery(query, "name","brandname","colorname","categoryname","shopname")
		  	.fuzziness(Fuzziness.AUTO);

		  NativeSearchQuery searchQuery = new NativeSearchQueryBuilder()
				   // .withFields("name","brandname","colorname","categoryname","shopname")
		            .withFilter(queryBuilder)
		           // .withPageable(PageRequest.of(10,8))
		            .withPageable(PageRequest.of(0,100))
		            .build();

		  // 2. Execute search
		  SearchHits<clothDTO> clothtHits = 
		  this.elasticsearchOperations.search(searchQuery, clothDTO.class,IndexCoordinates.of("database"));

		  // 3. Map searchHits to product list
		  List<clothDTO> clothMatches = new ArrayList<clothDTO>();
		  clothtHits.forEach(searchHit->{
			  clothMatches.add(searchHit.getContent());
		  });
		  
		  return clothMatches; 
		 //  return  elasticSearchQuery.findAll();
		  }
	  
	  
	/*	public List<clothDTO> queryDescriptionSearchAsYouType(String searchValue) throws IOException {

			List<clothDTO> menuItemList = new ArrayList<>();
			SearchRequest searchRequest2 = new SearchRequest("cdata");
	
			String descriptionSearchAsYouTypeQuery = "{\r\n"
		        		+ "    \"multi_match\": {\r\n"
		        		+ "      \"query\": \"" + searchValue + "\",\r\n"
		        		+ "      \"type\": \"bool_prefix\",\r\n"
		        		+ "      \"fields\": [\r\n"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
		        		+ "        \"name\",\r\n"
		        		+ "        \"brandname\",\r\n"
		        		+ "        \"colorname\",\r\n"
		        		+ "        \"categoryname\",\r\n"
		        		+ "        \"shopname\"\r\n"
		        		+ "      ]\r\n"
		        		+ "    }\r\n"
		        		+ "  },\r\n"
		        		+ "  \"highlight\" : {\r\n"
		        		+ "    \"fields\" : [\r\n"
		        		+ "      {\r\n"
		        		+ "        \"name\": { } \r\n"
		        		+ "      }\r\n"
		        		+ "    ]\r\n"
		        		+ "  }";

		        
			WrapperQueryBuilder qb = QueryBuilders.wrapperQuery(descriptionSearchAsYouTypeQuery);

			// add source builder.
			SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
			sourceBuilder.query(qb);
			// can be used for pagination.
			sourceBuilder.from(0);
			sourceBuilder.size(10);
			sourceBuilder.timeout(new TimeValue(60, TimeUnit.SECONDS));

			// add highlighter to search query.
			HighlightBuilder highlightBuilder = new HighlightBuilder();
			HighlightBuilder.Field highlightTitle = new HighlightBuilder.Field(clothDTO.class.getName());
			highlightTitle.highlighterType("unified");
			highlightBuilder.field(highlightTitle);

			sourceBuilder.highlighter(highlightBuilder);

			searchRequest2.source(sourceBuilder);

			String highlighted = "";
			SearchResponse searchResponse = elasticStackclient.search(searchRequest2, RequestOptions.DEFAULT);
			for (SearchHit searchHit : searchResponse.getHits().getHits()) {
				clothDTO menuItem = new ObjectMapper().readValue(searchHit.getSourceAsString(), clothDTO.class);
				
				if (!Objects.isNull(searchHit.getHighlightFields().get("menuTreeFinderHighlightedFields"))) {

					// get highlighted fields.
					if (!Objects
							.isNull(((HighlightField) searchHit.getHighlightFields().get(menuTreeFinderHighlightedFields))
									.getFragments())) {
						highlighted = ((HighlightField) searchHit.getHighlightFields().get(menuTreeFinderHighlightedFields))
								.getFragments()[0].string();
					}
				}
				menuItem.setHighlighted(highlighted);
				menuItemList.add(menuItem);
			}

			return menuItemList;
		}*/
	  
/*	  public SearchResponse autosuggestSearch(String searchValue) throws IOException {
	        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
	        BoolQueryBuilder qb = QueryBuilders.boolQuery();
	 	   // .withFields("name","brandname","colorname","categoryname","shopname")
	        PrefixQueryBuilder brandname = QueryBuilders.prefixQuery("brandname",searchValue);
	        PrefixQueryBuilder colorname = QueryBuilders.prefixQuery("colorname", searchValue);
	        PrefixQueryBuilder categoryname = QueryBuilders.prefixQuery("categoryname", searchValue);
	        PrefixQueryBuilder shopname = QueryBuilders.prefixQuery("shopname", searchValue);
	        qb.must(brandname);
	        qb.must(colorname);
	        qb.must(categoryname);
	        qb.must(shopname); 
	        //Similarly add more fields prefix queries.
	        sourceBuilder.query(qb);

	        SearchRequest searchRequest = new SearchRequest("dataset").source(sourceBuilder);
	        SearchResponse searchResponse = elasticStackclient.search(searchRequest, RequestOptions.DEFAULT);
	        System.out.println("Search JSON query \n" + searchRequest.source().toString()); //Generated ES search JSON.
	        return searchResponse;
	    }*/
	  
	  /* public SearchResponse suggestSearch(String searchValue) throws IOException {
	  CompletionSuggestionBuilder compBuilder = new
			  CompletionSuggestionBuilder("complete");
			  compBuilder.text(searchValue);
			  compBuilder.field(é);
			  suggestRequestBuilder suggestRequestBuilder =
			  client.prepareSuggest("dataset");
			  suggestRequestBuilder.addSuggestion(compBuilder);
			  suggestResponse suggestResponse =
			  suggestRequestBuilder.execute().actionGet();

			  CompletionSuggestion compSuggestion =
			  suggestResponse.getSuggest().getSuggestion("complete");

			  List<CompletionSuggestion.Entry> entryList = compSuggestion.getEntries();
			  if(entryList != null) {
			  CompletionSuggestion.Entry entry = entryList.get(0);
			  List<CompletionSuggestion.Entry.Option> options =entry.getOptions();
			  if(options != null) {
			  CompletionSuggestion.Entry.Option option = options.get(0);
			  toReturn = option.getText().string();
			  }
			  }
			  return toReturn;
	  } */
	  
   /*   client.admin().indices().prepareCreate("")
      .setSettings(ImmutableSettings.settingsBuilder().loadFromSource(jsonBuilder()
              .startObject()
              .startObject("analysis")
              .startObject("analyzer")
              .startObject("autocomplete")
              .field("type", "custom")
              .field("tokenizer", "standard")
              .field("filter", new String[]{"lowercase", "autocomplete_filter"})
              .endObject()
              .endObject()
              .startObject("filter")
              .startObject("autocomplete_filter")
              .field("type", "edge_ngram")
              .field("min_gram", "1")
              .field("max_gram", "20")
              .endObject()
              .endObject()
              .endObject()
              .endObject().string()));
      AnalyzeResponse analyzeResponse = elasticStackclient.indices().prepareAnalyze("trying out").execute().actionGet();
      for (AnalyzeResponse.AnalyzeToken analyzeToken : analyzeResponse.getTokens()) {
          System.out.println(analyzeToken.getTerm());
      }*/
}
