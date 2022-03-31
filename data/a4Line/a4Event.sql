SELECT top 1
      convert(varchar(16),time, 120) as time
      ,[MizBshFX_A4_1_3號脫水機C6出料過多_VALUE]
      ,[MizBshFX_A4_1_3號脫水機C6未出料_VALUE]
	  ,[MizBshFX_A4_1_2號脫水機C7出料過多_VALUE]
      ,[MizBshFX_A4_1_2號脫水機C7未出料_VALUE]
	  ,[MizBshFX_A4_1_1號脫水機C8出料過多_VALUE]
      ,[MizBshFX_A4_1_1號脫水機C8未出料_VALUE]
      ,[MizBshFX_A4_1_4號脫水機C9出料過多_VALUE]
      ,[MizBshFX_A4_1_4號脫水機C9未出料_VALUE]
      ,[MizBshFX_抽水泵過載]
         FROM [KEP].[dbo].[A4Dehydrator] 
where
  ([MizBshFX_A4_1_3號脫水機C6出料過多_VALUE] = 1 or [MizBshFX_A4_1_3號脫水機C6未出料_VALUE]=1
   or [MizBshFX_A4_1_2號脫水機C7出料過多_VALUE] =1 or [MizBshFX_A4_1_2號脫水機C7未出料_VALUE] =1
   or [MizBshFX_A4_1_1號脫水機C8出料過多_VALUE]=1 or [MizBshFX_A4_1_1號脫水機C8未出料_VALUE]= 1
   or [MizBshFX_A4_1_4號脫水機C9出料過多_VALUE]  = 1 or [MizBshFX_A4_1_4號脫水機C9未出料_VALUE] = 1
  or [MizBshFX_抽水泵過載] = 1 )
 and convert(varchar(16),time, 120) = convert(varchar(16),getDate(), 120)
  order by time desc