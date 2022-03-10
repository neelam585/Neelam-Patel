<?php
/**
 * @Author: Ha Manh
 * @Date:   2020-12-08 08:29:17
 * @Last Modified by:   Ha Manh
 * @Last Modified time: 2020-12-14 10:18:29
 */

namespace Log\Status\Helper;

class Data extends \Magento\Framework\App\Helper\AbstractHelper
{
    /**
     * @var array
     */
    protected $configModule;
    const XML_PATH_EMAIL_RECIPIENT = 'helloworld/general/enable';

    public function __construct(
        \Magento\Framework\App\Helper\Context $context,
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig

    )
    {
        parent::__construct($context);
        $this->configModule = $this->getConfig(strtolower($this->_getModuleName()));
        $this->scopeConfig = $scopeConfig;
    }

     public function isEnable() {
     $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;

     return $this->scopeConfig->getValue(self::XML_PATH_EMAIL_RECIPIENT, $storeScope);


     }

    public function getConfig($cfg='')
    {
        if($cfg) return $this->scopeConfig->getValue( $cfg, \Magento\Store\Model\ScopeInterface::SCOPE_STORE );
        return $this->scopeConfig;
    }

    
}
