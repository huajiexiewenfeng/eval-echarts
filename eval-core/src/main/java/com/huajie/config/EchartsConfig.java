package com.huajie.config;

import com.huajie.echarts.DefaultEchartsFactory;
import com.huajie.echarts.EchartsFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EchartsConfig {
    @Bean
    public EchartsFactory getEchartsFactory() {
        return DefaultEchartsFactory.getEchartsFactory();
    }
}
