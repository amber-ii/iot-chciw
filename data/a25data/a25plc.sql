SELECT 
format([MBTCP_A25PLC_A25PLC_TT_402_TIMESTAMP],'yyyy/MM/dd_HH:mm') as Date
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_DT_101_VALUE] 	,2) as numeric(20,2)) 	as DT_101
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_DT_301_VALUE] 	,2) as numeric(20,2)) 	as DT_301
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_FT_101_VALUE] 	,2) as numeric(20,2)) 	as FT_101
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_FT_102_VALUE] 	,2) as numeric(20,2)) 	as FT_102
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_FT_103_VALUE] 	,2) as numeric(20,2)) 	as FT_103
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_FT_201_VALUE] 	,2) as numeric(20,2)) 	as FT_201
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_FT_301_VALUE] 	,2) as numeric(20,2)) 	as FT_301
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_FT_302_VALUE] 	,2) as numeric(20,2)) 	as FT_302
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_FT_401_VALUE] 	,2) as numeric(20,2)) 	as FT_401
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_FT_402_VALUE] 	,2) as numeric(20,2)) 	as FT_402
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_MP_101_INV_VALUE]	,2) as numeric(20,2)) 	 as MP_101_INV
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_MP_102_INV_VALUE]	,2) as numeric(20,2)) 	as MP_102_INV
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_MP_103_INV_VALUE]	,2) as numeric(20,2)) 	as MP_103_INV
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_MP_104_MV_VALUE]	,2) as numeric(20,2)) 	as MP_104_MV
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_MP_105_MV_VALUE]	,2) as numeric(20,2)) 	 as MP_105_MV
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_MP_301_INV_VALUE]	,2) as numeric(20,2)) 	 as MP_301_INV
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_MP_303_MV_VALUE]	,2) as numeric(20,2)) 	 as MP_303_MV
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_PIDV_101_VALUE]	,2) as numeric(20,2)) 	 as PIDV_101
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_PIDV_401_VALUE]	,2) as numeric(20,2)) 	 as PIDV_401
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_PT_101_VALUE] 	,2) as numeric(20,2)) 	as PT_101
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_PT_102_VALUE] 	,2) as numeric(20,2)) 	as PT_102
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_PT_103_VALUE] 	,2) as numeric(20,2)) 	as PT_103
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_PT_104_VALUE] 	,2) as numeric(20,2)) 	as PT_104
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_PT_201_VALUE] 	,2) as numeric(20,2)) 	as PT_201
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_PT_202_VALUE] 	,2) as numeric(20,2)) 	as PT_202
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_PT_203_VALUE] 	,2) as numeric(20,2)) 	as PT_203
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_PT_204_VALUE] 	,2) as numeric(20,2)) 	as PT_204
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_PT_205_VALUE] 	,2) as numeric(20,2)) 	as PT_205
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_PT_206_VALUE] 	,2) as numeric(20,2)) 	as PT_206
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_PT_207_VALUE] 	,2) as numeric(20,2)) 	as PT_207
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_PT_208_VALUE] 	,2) as numeric(20,2)) 	as PT_208
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_PT_209_VALUE] 	,2) as numeric(20,2)) 	as PT_209
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_PT_210_VALUE] 	,2) as numeric(20,2)) 	as PT_210
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_PT_211_VALUE] 	,2) as numeric(20,2)) 	as PT_211
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_PT_212_VALUE] 	,2) as numeric(20,2)) 	as PT_212
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_PT_301_VALUE] 	,2) as numeric(20,2)) 	as PT_301
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_PT_302_VALUE] 	,2) as numeric(20,2)) 	as PT_302
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_PT_303_VALUE] 	,2) as numeric(20,2)) 	as PT_303
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_PT_401_VALUE] 	,2) as numeric(20,2)) 	as PT_401
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_RT_201_VALUE] 	,2) as numeric(20,2)) 	as RT_201
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_RT_202_VALUE] 	,2) as numeric(20,2)) 	as RT_202
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_RT_203_VALUE] 	,2) as numeric(20,2)) 	as RT_203
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_RT_204_VALUE] 	,2) as numeric(20,2)) 	as RT_204
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_RT_205_VALUE] 	,2) as numeric(20,2)) 	as RT_205
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_TT_101_VALUE] 	,2) as numeric(20,2)) 	as TT_101
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_TT_102_VALUE] 	,2) as numeric(20,2)) 	as TT_102
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_TT_103_VALUE] 	,2) as numeric(20,2)) 	as TT_103
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_TT_104_VALUE] 	,2) as numeric(20,2)) 	as TT_104
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_TT_105_VALUE] 	,2) as numeric(20,2)) 	as TT_105
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_TT_106_VALUE] 	,2) as numeric(20,2)) 	as TT_106
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_TT_107_VALUE] 	,2) as numeric(20,2)) 	as TT_107
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_TT_108_VALUE] 	,2) as numeric(20,2)) 	as TT_108
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_TT_109_VALUE] 	,2) as numeric(20,2)) 	as TT_109
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_TT_110_VALUE] 	,2) as numeric(20,2)) 	as TT_110
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_TT_111_VALUE] 	,2) as numeric(20,2)) 	as TT_111
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_TT_112_VALUE] 	,2) as numeric(20,2)) 	as TT_112
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_TT_113_VALUE] 	,2) as numeric(20,2)) 	as TT_113
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_TT_301_VALUE] 	,2) as numeric(20,2)) 	as TT_301
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_TT_302_VALUE] 	,2) as numeric(20,2)) 	as TT_302
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_TT_401_VALUE] 	,2) as numeric(20,2)) 	as TT_401
      ,	cast(round(	[MBTCP_A25PLC_A25PLC_TT_402_VALUE] 	,2) as numeric(20,2)) 	as TT_402
  	


FROM
[KEP].[dbo].[A25PLCDB]
WHERE [MBTCP_A25PLC_A25PLC_TT_402_TIMESTAMP] between @startDate and DATEADD(day,1,@endDate) order by MBTCP_A25PLC_A25PLC_TT_402_TIMESTAMP asc
  