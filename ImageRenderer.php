<?php
namespace Banner\Grid\Block\Adminhtml\Grid\Renderer;

use Magento\Backend\Block\Widget\Grid\Column\Renderer\AbstractRenderer;
use \Magento\Framework\DataObject;
use Magento\Store\Model\StoreManagerInterface;

class ImageRenderer extends AbstractRenderer
{
   private $_storeManager;
   /**
    * @param \Magento\Backend\Block\Context $context
    * @param array $data
    */
   public function __construct(\Magento\Backend\Block\Context $context, 
StoreManagerInterface $storemanager, array $data = [])
   {
       $this->_storeManager = $storemanager;
       parent::__construct($context, $data);
       $this->_authorization = $context->getAuthorization();
   }
   /**
    * Renders grid column
    *
    * @param Object $row
    * @return  string
    */
   public function render(DataObject $row)
   {
       $mediaDirectory = $this->_storeManager->getStore()->getBaseUrl(
           \Magento\Framework\UrlInterface::URL_TYPE_MEDIA
       );
       $imageUrl = $mediaDirectory.'image/'.$this->_getValue($row);
       //print_r($imageUrl);die;
       return '<img src="'.$imageUrl.'" width="50"/>';
   }
}
